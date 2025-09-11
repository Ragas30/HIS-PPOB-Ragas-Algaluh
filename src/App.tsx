import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/login";
import Register from "./auth/register";

// Contoh halaman beranda (sementara)
function Home() {
  return <div className="text-white p-6">Welcome to Kasirin POS</div>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
