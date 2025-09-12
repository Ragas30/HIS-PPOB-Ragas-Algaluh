import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/login";
import Register from "./auth/register";
import Dashboard from "./pages/dashboard";
import { getToken } from "./auth/auth";
import AppLayout from "./layout/applayout";
import TopUp from "./pages/topup";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route index element={<Navigate to="/topUp" replace />} />
        <Route path="topUp" element={<TopUp />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
