import { useTickets } from "../../hooks/use-tickets";



const Stats = () => {
    const { tickets } = useTickets();

    return (
        <div className="mb-6 gap-4 grid grid-cols-4 w-full">
            <div className="bg-white border border-gray-200 p-3 rounded-xl flex flex-col ps-5 ">
               <span className="text-gray-400 text-xs font-semibold uppercase"> Total Tickets</span>
               <span className="text-black text-2xl font-bold">
                {tickets.length}
               </span>
            </div>
            <div className="bg-white border border-gray-200 p-3 rounded-xl flex flex-col ps-5 ">
                <span className="text-gray-400 text-xs font-semibold uppercase">Confirmed</span>
                <span className="text-green-600 text-2xl font-bold">
                   {tickets.filter(ticket=> ticket.status === 'confirmed').length}
                </span>
            </div>
            <div className="bg-white border border-gray-200 p-3 rounded-xl flex flex-col ps-5 ">
               <span className="text-gray-400 text-xs font-semibold uppercase">Pending</span>
               <span className="text-yellow-700 text-2xl font-bold">
                 {tickets.filter(ticket => ticket.status === 'pending' ).length}
               </span>
            </div>
            <div className="bg-white border border-gray-200 p-3 rounded-xl flex flex-col ps-5 ">
                <span className="text-gray-400 text-xs font-semibold uppercase">Cancelled</span>
                <span className="text-red-600 text-2xl font-bold">
                    {tickets.filter(ticket => ticket.status === 'cancelled').length}
                </span>
            </div>
        </div>
    )
}

export default Stats