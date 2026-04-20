import { useServiceWorkerUpdate } from '../../hooks/use-service-worker';

export const UpdateNotification = () => {
  const { needsUpdate, reloadPage } = useServiceWorkerUpdate();

  if (!needsUpdate) return null;

  return (
    <div className="fixed mx-auto bg-gray-400 text-white p-4 rounded-lg shadow-sm z-50">
      <p className="mb-2 font-semibold">New version available!</p>
      <button
        onClick={reloadPage}
        className="w-full active:scale-55 mx-auto transition text-sm text-white rounded-lg hover:border-gray-900 hover:text-gray-900"
      >
        Update Now
      </button>
    </div>
  );
};