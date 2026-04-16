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
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-8 rounded-lg min-w-[300px] z-60" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </>
    )
}


export default Modal