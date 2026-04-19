import { useState, useReducer } from "react";
import { useTickets, type Ticket } from "../hooks/use-tickets";
import Stats from "../components/stats/stats";
import Search from "../components/search/search";
import Filters from "../components/filters/filters";
import Sort from "../components/sort/sort";
import Pagination from "../components/pagination/pagination";
import EditTicket from "../components/edit-ticket/edit-ticket";
import DeleteTicket from "../components/delete-ticket/delete-ticket";

// Types

type State = {
  query: string,
  status: string,
  airline: string,
  sort: string,
  pageRange: {start:number, end: number}
};

type Action = | 
   {type: "SET_QUERY", payload:string} |
   {type: "SET_STATUS", payload:string} |
   {type: "SET_AIRLINE", payload:string} |
   {type: "SET_SORT", payload:string} |
   {type: "SET_PAGE", payload:{start: number, end:number}};

// Initial

const initialState : State = {
  query:"",
  status:"",
  airline:"",
  sort:"id-asc",
  pageRange: {start:0, end:5}
};

// Reducer
const ticketReducer = (state: State, action: Action): State => {
  const resetPage = {pageRange : {start:0, end:5}};

  switch (action.type) {
    case "SET_QUERY":
      return {...state, query: action.payload, ...resetPage};
    case "SET_STATUS":
      return {...state, status: action.payload, ...resetPage};
    case "SET_AIRLINE":
      return {...state, airline:action.payload, ...resetPage};
    case "SET_SORT":
      return {...state, sort:action.payload, ...resetPage};
    case "SET_PAGE":
      return {...state, pageRange: action.payload};
    default:
      return state

  }
}

// style

const statusStyles = {
  confirmed: "bg-green-50 text-green-700 border border-green-200",
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
  cancelled: "bg-red-50 text-red-700 border border-red-200",
  refunded: "bg-purple-50 text-purple-700 border border-purple-200",
};

// COMPONENT

const Tickets = () => {
  const { tickets, loading, error, deletedTicket, updatedTicket } = useTickets();
  const [deleteTicket, setDeleteTicket] = useState<Ticket| null>(null);
  const [viewTicket, setViewTicket] = useState<Ticket | null>(null);
  const [editTicket, setEditTicket] = useState<Ticket | null>(null);
  

  const [state, dispatch] = useReducer(ticketReducer, initialState);
  const {query,status,airline,sort,pageRange} = state;

  // Filter

  let displayTickets = [...tickets];

  if (query) {
    displayTickets = displayTickets.filter(ticket => 
      Object.values(ticket).some(val => 
        String(val).toLowerCase().includes(query.toLowerCase())
      )
    );
  }

  if (status) {
    displayTickets = displayTickets.filter(ticket => ticket.status === status);
  }

  if (airline) {
    displayTickets = displayTickets.filter(ticket => ticket.airline === airline);
  }

  if (sort) {
    const[column, direction] = sort.split('-');

    displayTickets.sort((a,b) => {
      const aVal: number = column === 'date' ? new Date(a.date).getTime() : Number(a.id);
      const bVal: number = column === 'date' ? new Date(b.date).getTime() : Number(b.id);

      return direction === 'asc' ? aVal - bVal : bVal - aVal
    });   
  }

  const paginatedTickets = displayTickets.slice(pageRange.start, pageRange.end);


  if (loading)
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  if (error)
    return (
      <div>
        <span>Error: {error}</span>
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <Stats/>
      <div className="bg-white border border-gray-200 rounded-xl overflow-scroll">
        <div className="flex items-center justify-between gap-3 p-4 border-b border-gray-200 flex-wrap">
          <span className="text-lg font-semibold text-gray-800">
            All Tickets
          </span>
          <div className="flex gap-3">
            <Search query={query} onSearch={(val)=> dispatch({type: "SET_QUERY", payload: val})}/>
            <Filters status={status} onStatus={(val) => dispatch({type:"SET_STATUS", payload: val})} airline={airline} onAirline={(val)=> dispatch({type:"SET_AIRLINE", payload:val})} />
            <Sort value={sort} setOrder={(val)=> dispatch({type:"SET_SORT", payload:val})} />
          </div>
        </div>
        <table className="w-full min-w-[700px] md:table-fixed">
          <thead className="bg-gray-50 border-b border-gray-200 overflow-scroll">
            <tr>
              {[
                "ID",
                "Passenger",
                "Phone",
                "Route",
                "Airline",
                "Date",
                "Status",
                "",
              ].map((title) => (
                <th
                  key={title}
                  className={`px-4 py-3 text-start font-semibold text-gray-400 uppercase tracking-wide ${
                    title === "ID" ? "w-20" : ""
                  }`}
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedTickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-4 font-mono text-xs text-gray-400 w-20">
                  #{ticket.id}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-semibold text-gray-800">
                      {ticket.passengerName}
                    </span>
                    <span className="text-xs text-gray-800 font-semibold mt-0.5">
                      {ticket.email}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 font-semibold">
                  <span >
                    {ticket.phone}
                  </span>
                </td>
                <td className="px-4 py-4 font-mono text-sm text-gray-700">
                  <div className="flex gap-2">
                    <span>{ticket.origin}</span>→
                    <span>{ticket.destination}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {ticket.airline}
                </td>
                <td className="px-4 py-4 text-xs font-mono text-gray-600">
                  {ticket.date}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${
                      statusStyles[ticket.status]
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setViewTicket(ticket)}
                      className="w-7 h-7 bg-transparent rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-500 transition-all text-xs"
                    >
                      👁
                    </button>
                    <button
                      onClick={() => setEditTicket(ticket)}
                      className="w-7 h-7 bg-transparent rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-amber-50 hover:border-green-600 hover:text-green-600 transition-all text-xs"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => setDeleteTicket(ticket)}
                      className="w-7 h-7 bg-transparent rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all text-xs"
                    >
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center">
            <p className="gap-1 flex px-4">
              <span className="text-xs text-gray-400">  
                {pageRange.start + 1} - {Math.min(pageRange.end, displayTickets.length)}
              </span>
              <span className="text-xs text-gray-400">of</span>
              <span className="text-xs text-gray-400">{displayTickets.length}</span>
            </p>
           <Pagination totalItems={displayTickets.length} itemsPerPage={5} onChangePage={(start,end)=> dispatch({type:"SET_PAGE", payload:{start,end}})} />
        </div>
      </div>

      {viewTicket && <div>View</div>}

      {editTicket &&
       <EditTicket
        ticket={editTicket}
        onClose={() => setEditTicket(null)}
        onSave={updatedTicket}
       />
      }

      {deleteTicket && 
        <DeleteTicket
          ticket={deleteTicket}
          onClose={() => setDeleteTicket(null)}
          onConfirm={deletedTicket}
        />
      }
    </div>
  );
};

export default Tickets;
