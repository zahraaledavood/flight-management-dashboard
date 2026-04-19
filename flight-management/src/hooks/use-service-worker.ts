import { useState, useEffect } from "react"

export const useServiceWorkerUpdate = () => {
    const [needsUpdate, setNeedsUpdate]= useState(false);

    useEffect(()=>{
        if (!('serviceWorker' in navigator)) return;

        const checkForUpdate = () => {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                registrations.forEach((reg) => {
                    reg.addEventListener('updatefound', ()=> {
                        setNeedsUpdate(true);
                    });
                });
            });
        };

        checkForUpdate();

        const interval = setInterval(checkForUpdate, 60 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const reloadPage = () => {
        window.location.reload();
    };

    return {needsUpdate, reloadPage}

}