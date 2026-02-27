import { useState } from "react";
import { useTickets, type Ticket } from "../hooks/use-tickets";

const statusStyles = {
  confirmed: "bg-green-50 text-green-700 border border-green-200",
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
  cancelled: "bg-red-50 text-red-700 border border-red-200",
  refunded: "bg-purple-50 text-purple-700 border border-purple-200",
};

const Tickets = () => {
  const { tickets, loading, error, deleteTicket } = useTickets();
  const [viewTicket, setViewTicket] = useState<Ticket | null>(null);
  const [editTicket, setEditTicket] = useState<Ticket | null>(null);

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
      <div className="bg-white border border-gray-200 rounded-xl overflow-scroll">
        <div className="flex items-center justify-between gap-3 p-4 border-b border-gray-200 flex-wrap">
          <span className="text-lg font-semibold text-gray-800">
            All Tickets
          </span>
        </div>
        <table className="w-full min-w-[700px] md:table-fixed">
          <thead className="bg-gray-50 border-b border-gray-200 overflow-scroll">
            <tr>
              {[
                "ID",
                "Passenger",
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
            {tickets.map((ticket) => (
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
                    <span className="text-xs text-gray-400 mt-0.5">
                      {ticket.email}
                    </span>
                  </div>
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
                      className="w-8 h-9 bg-transparent rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-500 transition-all text-sm"
                    >
                      🎫
                    </button>
                    <button
                      onClick={() => setEditTicket(ticket)}
                      className="w-8 h-9 bg-transparent rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-500 transition-all text-sm"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => deleteTicket(ticket.id)}
                      className="w-8 h-9 bg-transparent rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all text-sm"
                    >
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewTicket && <div>View</div>}

      {editTicket && <div>Edit</div>}
    </div>
  );
};

export default Tickets;
