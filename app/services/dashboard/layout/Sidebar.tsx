"use client";

import React, { useState } from "react";
// import { IconType } from "react-icons";

interface MenuItem {
  name: string;
  label: string;
  icon?: React.ReactNode;
}

interface SidebarProps {
  menu: MenuItem[];
  activePage: string;
  setActivePage: (page: string) => void;
  userName: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  menu,
  activePage,
  setActivePage,
  userName,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  return (
    <aside
      className={`h-full sticky bg-blue-50 from-gray-900 to-gray-800 text-gray-800 ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 p-4 `}
    >
      {/* Toggle Button */}
      <div className="flex justify-between items-center mb-6">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold whitespace-nowrap">
            Hello, {userName}
          </h2>
        )}
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-950 focus:outline-none"
        >
          {/* Hamburger icon or arrow */}☰
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-2 ">
        {menu.map((item) => (
          <button
            key={item.name}
            onClick={() => setActivePage(item.name)}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all
              ${
                activePage === item.name
                  ? "bg-gray-700 font-semibold"
                  : "hover:bg-gray-700"
              }`}
          >
            <span className="text-lg text-black">{item.icon}</span>
            {!isCollapsed && (
              <span className="whitespace-nowrap">{item.label}</span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
