import { useTickets } from "../hooks/use-tickets"
import Tickets from "./tickets"

const Dashboard = () => {

    const { tickets, loading, error} = useTickets()
    if (loading) return <div>Loading ...</div>
    if(error) return <div>Error : {error}</div>

    return (
        <>
            {tickets.length && 
                <Tickets/>
            }
        </>
    )
}

export default Dashboard