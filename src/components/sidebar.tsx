import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

type MenuItem = {
  label: string;
  to: string;
  icon?: React.ReactNode;
};

const menu: MenuItem[] = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 110-2h6a1 1 0 010 2h-6zM6 9a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
        />
      </svg>
    ),
  },
  {
    label: "Settings",
    to: "/settings",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1 1 0 00-.868-.71 1 1 0 00-1.705.255c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

type Props = {
  collapsed?: boolean;
  onToggle?: () => void;
  /** sembunyikan tombol hamburger bawaan (kalau kamu sudah punya di Topbar) */
  hideMobileHamburger?: boolean;
};

const Sidebar: React.FC<Props> = ({ collapsed = false, onToggle, hideMobileHamburger = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const dialogRef = useRef<HTMLDivElement>(null);

  // restore collapsed state (desktop)
  useEffect(() => {
    const saved = localStorage.getItem("sidebar_collapsed");
    if (saved != null) setIsCollapsed(saved === "true");
  }, []);

  const toggleCollapse = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    localStorage.setItem("sidebar_collapsed", String(next));
    onToggle?.();
  };

  // Close drawer ketika route berubah (mobile)
  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Escape untuk drawer (mobile)
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // focus trap minimal (mobile)
  useEffect(() => {
    if (!mobileOpen) return;
    dialogRef.current?.focus();
  }, [mobileOpen]);

  const SidebarBody = (
    <>
      {/* Brand / Toggle */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 border border-gray-700 flex items-center justify-center text-gray-100 font-semibold shadow">K</div>
          <span className={`text-gray-100 font-bold tracking-wide ${isCollapsed ? "hidden" : "inline"}`}>Kasirin POS</span>
        </div>
        <button onClick={toggleCollapse} className="hidden md:inline-flex text-gray-400 hover:text-gray-200 p-2 rounded-lg hover:bg-gray-800" aria-label="Toggle sidebar">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isCollapsed ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />}
          </svg>
        </button>
      </div>

      {/* Menu */}
      <nav className="p-3 space-y-1">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all",
                isActive ? "bg-gray-800/70 border-gray-700 text-gray-100 shadow" : "bg-transparent border-transparent text-gray-300 hover:text-white hover:bg-gray-800/40 hover:border-gray-700",
              ].join(" ")
            }
          >
            <span className="shrink-0 text-gray-300 group-hover:text-white">{item.icon}</span>
            <span className={`truncate ${isCollapsed ? "hidden" : "inline"}`}>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer small text */}
      <div className={`mt-auto p-3 text-xs text-gray-500 border-t border-gray-800 ${isCollapsed ? "hidden" : "block"}`}>© {new Date().getFullYear()} Kasirin</div>
    </>
  );

  return (
    <>
      {/* MOBILE: hamburger floating button */}
      {!hideMobileHamburger && (
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="md:hidden fixed top-3 left-3 z-40 p-2 rounded-xl bg-gray-900/80 border border-gray-800 text-gray-200 shadow-lg backdrop-blur hover:bg-gray-800/80"
          aria-label="Open sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className={`${isCollapsed ? "w-20" : "w-64"} h-screen sticky top-0 bg-gray-900/80 backdrop-blur-xl border-r border-gray-800 transition-all duration-300 hidden md:flex flex-col`}>{SidebarBody}</aside>

      {/* MOBILE DRAWER */}
      <div className={`${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} md:hidden fixed inset-0 z-50 transition-opacity`}>
        {/* overlay */}
        <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />

        {/* panel */}
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          className={`${mobileOpen ? "translate-x-0" : "-translate-x-full"} absolute left-0 top-0 h-full w-72 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 shadow-2xl transition-transform duration-300 focus:outline-none`}
        >
          {/* header mobile */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 border border-gray-700 flex items-center justify-center text-gray-100 font-semibold shadow">K</div>
              <span className="text-gray-100 font-bold tracking-wide">Kasirin POS</span>
            </div>
            <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-gray-200 p-2 rounded-lg hover:bg-gray-800" aria-label="Close sidebar">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* isi menu (pakai versi non-collapsed untuk mobile) */}
          <nav className="p-3 space-y-1">
            {menu.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "group flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all",
                    isActive ? "bg-gray-800/70 border-gray-700 text-gray-100 shadow" : "bg-transparent border-transparent text-gray-300 hover:text-white hover:bg-gray-800/40 hover:border-gray-700",
                  ].join(" ")
                }
              >
                <span className="shrink-0 text-gray-300 group-hover:text-white">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto p-3 text-xs text-gray-500 border-t border-gray-800">© {new Date().getFullYear()} Kasirin</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
