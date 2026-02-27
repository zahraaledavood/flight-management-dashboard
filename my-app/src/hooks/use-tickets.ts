import { useEffect, useState } from "react";

export type Ticket = {
  id: string;
  passengerName: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  airline: string;
  date: string;
  flightNumber: string;
  price: number;
  status: "confirmed" | "pending" | "cancelled" | "refunded";
};

const API_URL = "https://jsonkeeper.com/b/D5IQI";

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string |null>(null)

  useEffect(() => {
    fetch(API_URL)
     .then(res => {
        if(!res.ok) throw new Error ('Failed to fetch')
            return res.json()
     })
     .then(data => {
        setTickets(data)
        setLoading(false)
     })
     .catch(err => {
        setError(err.message)
        setLoading(false)
     })
  }, []);

  const deleteTicket = (id: string) => {
    setTickets(prev => prev.filter(t => t.id !== id))
  }

  return { tickets, loading, error, deleteTicket}
};
