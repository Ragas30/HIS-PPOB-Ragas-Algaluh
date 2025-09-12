import React from "react";
import { clearAuth } from "../auth/auth";
import { useNavigate } from "react-router-dom";

type Props = {
  onOpenSidebar?: () => void;
};

const Topbar: React.FC<Props> = ({ onOpenSidebar }) => {
  const navigate = useNavigate();

  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <header className="h-16 sticky top-0 z-30 bg-gray-900/70 backdrop-blur-xl border-b border-gray-800 flex items-center px-3 md:px-6">
      <button className="md:hidden mr-2 p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800" onClick={onOpenSidebar} aria-label="Open sidebar">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex-1">
        <div className="hidden md:flex max-w-md w-full bg-gray-800/60 border border-gray-700 rounded-xl px-3 py-2 items-center">
          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input type="text" placeholder="Cari sesuatu..." className="bg-transparent w-full text-sm text-gray-200 placeholder-gray-500 focus:outline-none" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => navigate("/topup")} className="hidden sm:inline-flex items-center px-3 py-1.5 text-sm rounded-xl bg-gray-800 border border-gray-700 text-gray-100 hover:bg-gray-700">
          Top Up
        </button>
        <button onClick={logout} className="hidden sm:inline-flex items-center px-3 py-1.5 text-sm rounded-xl bg-gray-800 border border-gray-700 text-gray-100 hover:bg-gray-700">
          Logout
        </button>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 border border-gray-700 flex items-center justify-center text-gray-100 font-semibold shadow">U</div>
      </div>
    </header>
  );
};

export default Topbar;
