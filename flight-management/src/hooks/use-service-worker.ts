import { useEffect, useState } from 'react';

interface ServiceWorkerUpdate {
  needsUpdate: boolean;
  reloadPage: () => void;
  skipUpdate: () => void;
}

export const useServiceWorkerUpdate = (): ServiceWorkerUpdate => {
  const [needsUpdate, setNeedsUpdate] = useState(false);

  useEffect(() => {
    const isProduction = import.meta.env.PROD;
    
    if (!isProduction || !('serviceWorker' in navigator)) {
      return;
    }

    let registration: ServiceWorkerRegistration | null = null;

    const registerSW = async () => {
      try {
        registration = await navigator.serviceWorker.register('/sw.js');
        setInterval(() => {
          registration?.update();
        }, 60000);

        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration?.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                console.log('✨ New version available!');
                setNeedsUpdate(true);
              }
            });
          }
        });
      } catch (error) {
        console.error('SW registration failed:', error);
      }
    };

    registerSW();
  }, []);

  const reloadPage = () => {
    window.location.reload();
  };

  const skipUpdate = () => {
    setNeedsUpdate(false);
  };

  return { needsUpdate, reloadPage, skipUpdate };
};