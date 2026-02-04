import React from "react";

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
};

const Modal = ({isOpen, onClose, children}: ModalProps) => {
    if (!isOpen) return null;
    return(
        <>
            <div className="fixed" onClick={onClose}>
                <div className="fixed">
                    {children}
                </div>
            </div>
        </>
    )
}


export default Modal