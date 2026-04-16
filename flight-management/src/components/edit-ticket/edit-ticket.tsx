import { useState } from "react"
import {  type Ticket } from "../../hooks/use-tickets"
import Modal from "../modal/modal"
import './edit-ticket.scss'

type EditTicketProps = {
    ticket: Ticket | null,
    onClose: () => void,
    onSave: (updated: Ticket) => void
}

const airlineList = ["Iran Air", "Mahan Air", "Aseman", "Zagros", "Airtour", "Varesh"]


const EditTicket = ({ticket, onClose, onSave}: EditTicketProps) => {
    const [form, setForm] = useState({
        status: ticket?.status ?? "pending",
        airline: ticket?.airline ?? "",
        date: ticket?.date ?? ""
    });
    const [saved, setSaved] = useState(false);

    if (!ticket) return null;

    const handleChange = (field: string, value:string) => {
        setForm((prev) => ({...prev, [field]: value}));
    }

    const handleSave = () => {
        onSave({ ...ticket, ...form});
        setSaved(true)
    }

    return (
        <Modal isOpen={!!ticket} onClose={onClose}>
            <div>
                {saved ? (
                    <div className="flex flex-col items-center gap-3 py-2">
                        <div className="bg-green-500 font-semibold text-md h-20 w-20 px-10 py-9 rounded-full border text-white flex items-center justify-center">
                            ✓
                        </div>
                        <p className="text-sm font-semibold text-black">
                            Changes saved successfully
                        </p>
                        <p className="text-sm text-gray-700">
                            Ticket #{ticket?.id} has been updated.
                        </p>
                        <button onClick={onClose} className="text-xs text-white bg-green-500 hover:bg-green-600 rounded-lg">
                            Done
                        </button>
                    </div>
                ): (
                    <>
                        <div className="pb-4">
                            <h2 className="text-base font-semibold text-black text-center">Edit Ticket</h2>
                        </div>

                        <div className="flex flex-col gap-1.5 rounded-lg bg-gray-50 py-4">
                            <Row label="Passenger" value={ticket?.passengerName} />
                            <Row label="Email" value={ticket?.email}/>
                            <Row label="Phone" value={ticket?.phone} />
                            <Row label="Route" value={`${ticket?.origin} + ${ticket?.destination}`}/>
                        </div>

                        <div className="flex flex-col gap-3 border-t pt-1">
                            <Field label="Status">
                                <select
                                    value={form.status}
                                    onChange={(e)=> handleChange("status", e.target.value)}
                                    className="w-full border border-gray-200 rounded-md bg-white text-xs py-1"
                                >
                                    {["confirmed", "pending", "cancelled", "refunded"].map((stat)=> (
                                        <option key={stat} value={stat}>{stat}</option>
                                    ))}
                                </select>
                            </Field>
                            <Field label="Airline">
                                    <select 
                                        value={form.airline}
                                        onChange={(e) => handleChange("airline", e.target.value)}
                                        className="w-full border border-gray-200 rounded-md bg-white text-xs py-1"
                                    >
                                        {airlineList.map((airline)=> (
                                            <option key={airline} value={airline}>{airline}</option>
                                        ))}
                                    </select>
                            </Field>
                            <Field label="Date">
                                   <input type="date" value={form.date}
                                    onChange={(e)=> handleChange("date", e.target.value)}
                                    className="w-full border bg-white border-gray-200 rounded-md  text-xs py-1" />
                            </Field>
                        </div>

                        <div className="flex justify-center gap-2 mt-4">
                            <button
                                onClick={onClose}
                                className="rounded-lg bg-gray-500 text-white text-xs p-2"
                            >
                                Cancel
                            </button>                        
                            <button
                                onClick={handleSave}
                                className="text-white bg-green-500 rounded-lg text-xs p-2 px-4"
                            >
                                Save
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}

// helper

const Row = ({label, value}: {label:string, value:string | undefined}) => {
   return(
    <div className="flex justify-between">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-xs text-gray-800">{value}</span>
    </div>
   );
}

const Field = ({label, children}: {label:string, children:React.ReactNode}) => {
    return(
        <div className="flex flex-col gap-1 py-2">
            <label className="text-xs font-semibold">{label}</label>
            {children}
        </div>
    )
}

export default EditTicket