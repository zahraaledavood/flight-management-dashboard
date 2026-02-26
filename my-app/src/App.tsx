import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login-page";
import ProtectedRoute from "./components/protected-route";
import Dashboard from "./pages/dashboard";
import Layout from "./layouts/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout/>
          </ProtectedRoute>
        } />
        <Route index element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App