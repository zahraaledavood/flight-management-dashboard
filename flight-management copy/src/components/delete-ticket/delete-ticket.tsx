import {  type Ticket } from "../../hooks/use-tickets"
import Modal from "../modal/modal"

type DeleteTicketProps = {
    ticket: Ticket | null,
    onConfirm : (id: string) => void,
    onClose: () => void
}


const DeleteTicket = ({ticket, onConfirm, onClose}: DeleteTicketProps) => {

    const handleDelete = () => {
        if(ticket){
            onConfirm(ticket.id);
        }
        onClose();
    } 

    return (
        <Modal isOpen={!!ticket} onClose={onClose}>
            <div className="flex flex-col">
                <p className="text-md font-semibold text-gray-800 flex flex-col text-center">
                   Are you sure you want to delete this ticket?
                   <span className="text-xs text-red-500 pt-1">
                     This action cannot be undone.
                   </span>
                </p>
                <div className="flex gap-2 justify-center pt-5">
                    <button className="text-xs bg-gray-400 text-white"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button className="text-xs bg-red-600 text-white"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    
                </div>
            </div>
        </Modal>
    )
}

export default DeleteTicket