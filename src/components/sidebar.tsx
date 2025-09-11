import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

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
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065zM7.496 7.516 5.01 5.01a.997.997 0 011.487-1.487l5.05 5.05 2.485-2.485a.997.997 0 111.487 1.487zM7.91 8.518 5.485 6a.997.997 0 011.022-.022l6.656 6.657-.022 1.022a.997.997 0 01-.022-1.022z"
        />
      </svg>
    ),
  },
];

type Props = {
  collapsed?: boolean;
  onToggle?: () => void;
};

const Sidebar: React.FC<Props> = ({ collapsed = false, onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("sidebar_collapsed");
    if (saved != null) setIsCollapsed(saved === "true");
  }, []);

  const toggle = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    localStorage.setItem("sidebar_collapsed", String(next));
    onToggle?.();
  };

  return (
    <aside className={`${isCollapsed ? "w-20" : "w-64"} h-screen sticky top-0 bg-gray-900/80 backdrop-blur-xl border-r border-gray-800 transition-all duration-300 hidden md:flex flex-col`}>
      {/* Brand / Toggle */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 border border-gray-700 flex items-center justify-center text-gray-100 font-semibold shadow">K</div>
          {!isCollapsed && <span className="text-gray-100 font-bold tracking-wide">Kasirin POS</span>}
        </div>
        <button onClick={toggle} className="text-gray-400 hover:text-gray-200 p-2 rounded-lg hover:bg-gray-800" aria-label="Toggle sidebar">
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
            onClick={() => navigate(item.to)}
          >
            <span className="shrink-0 text-gray-300 group-hover:text-white">{item.icon}</span>
            {!isCollapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer small text */}
      {!isCollapsed && <div className="mt-auto p-3 text-xs text-gray-500 border-t border-gray-800">© {new Date().getFullYear()} Kasirin</div>}
    </aside>
  );
};

export default Sidebar;
