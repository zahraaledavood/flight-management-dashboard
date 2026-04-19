import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/login-page.tsx";
import ProtectedRoute from "./components/protected-route.tsx";
import Dashboard from "./pages/dashboard.tsx";
import Layout from "./layouts/layout.tsx";
import Tickets from "./pages/tickets.tsx";
import Setting from "./pages/setting.tsx";
import 'react-toastify/dist/ReactToastify.css';
import { UpdateNotification } from "./components/common/update-notification.tsx";


function App() {
  return (
    <>
     <BrowserRouter>
     <UpdateNotification/>
      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="setting" element={<Setting/>} />

          <Route path="*" element={<div>Not Found</div>} />
        </Route>

        <Route path="*" element={<LoginPage />} />

      </Routes>
    </BrowserRouter>
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    </>
  );
}

export default App;
