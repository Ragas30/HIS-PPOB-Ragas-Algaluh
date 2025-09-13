import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
  
      <div className={`fixed inset-0 z-40 md:hidden ${mobileOpen ? "block" : "hidden"}`} aria-hidden={!mobileOpen}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
        <div className="absolute left-0 top-0 h-full w-72">
          <Sidebar collapsed={false} onToggle={() => undefined} />
        </div>
      </div>

      <div className="flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <main className="flex-1 min-w-0">
          <Topbar onOpenSidebar={() => setMobileOpen(true)} />

          <div className="p-4 sm:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
