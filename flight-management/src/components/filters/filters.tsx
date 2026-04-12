import React from "react";
import { useTickets } from "../../hooks/use-tickets";

type FilterProps = {
    status: string,
    airline: string,
    onStatus: (status: string) => void,
    onAirline: (airline:string) => void
}

const Filters = ({status, airline, onStatus, onAirline}: FilterProps) => {

    const { tickets} = useTickets();
    const ticketStatus = React.useMemo(() => {
        const statuses = tickets.map(ticket => ticket.status);
        return [...new Set(statuses)];
    }, [tickets]);

    const ticketAirline = React.useMemo(() => {
        const airlines = tickets.map(ticket => ticket.airline);
        return [...new Set(airlines)];
    }, [tickets])

    return (
        <>
            <select name="status" id="status" value={status} onChange={(e)=> onStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg focus:outline-none bg-white text-black text-xs"
                >
                <option value="">All Status</option>
                {ticketStatus.map(stat => (
                    <option value={stat} key={stat}>{stat}</option>
                ))}
            </select>
            <select name="airline" id="airline" value={airline} onChange={(e)=> onAirline(e.target.value)}
                className="w-full border border-gray-300 rounded-lg focus:outline-none bg-white text-black text-xs"
                >
                <option value="">All Airlines</option>
                {ticketAirline.map(air => (
                    <option value={air} key={air}>{air}</option>
                ))}
            </select>
        </>
    )
}

export default Filters