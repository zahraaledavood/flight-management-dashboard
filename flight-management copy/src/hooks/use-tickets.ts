import { useEffect, useState } from "react";
import {toast} from 'react-toastify'

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

// const API_URL = '';   temporary bc of internet

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string |null>(null)

  useEffect(() => {
    fetch("/tickets.json")
     .then(res => {
        if(!res.ok) throw new Error ('Failed to fetch');
        return res.json()
     })
     .then(data => { 
        const saved = localStorage.getItem("tickets");
        const finalData = saved? JSON.parse(saved) : data;
        
        if (!saved){
          localStorage.setItem("tickets", JSON.stringify(data));
        }
        
        setTickets(finalData);
        setLoading(false)
     })
     .catch(err => {
        setError(err.message)
        setLoading(false)
     })
  }, []);

  const deletedTicket = (id: string) => {
    setTickets(prev => {
      const updated = prev.filter(t => t.id !== id);
      localStorage.setItem("tickets", JSON.stringify(updated));
      return updated
    });
    toast.error('Ticket has been deleted successfully');
  }

  const updatedTicket = (updated: Ticket) => {
    setTickets(prev => {
      const newList = prev.map(t => t.id === updated.id ? updated : t);
      localStorage.setItem("tickets", JSON.stringify(newList));
      return newList
    });
    toast.success('Ticket updated success')
  }

  return { tickets, loading, error, deletedTicket, updatedTicket}
};
