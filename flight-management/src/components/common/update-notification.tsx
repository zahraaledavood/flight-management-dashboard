import { useServiceWorkerUpdate } from '../../hooks/use-service-worker';

export const UpdateNotification = () => {
  const { needsUpdate, reloadPage } = useServiceWorkerUpdate();

  if (!needsUpdate) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
      <p className="mb-2 font-semibold">New version available!</p>
      <button
        onClick={reloadPage}
        className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition"
      >
        Update Now
      </button>
    </div>
  );
};