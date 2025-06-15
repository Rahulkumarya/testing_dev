"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Bell } from "lucide-react";
import ServicesMenu from "./ServicesMenu";
import NotificationDropdown from "./NotificationDropdown";

export default function Navbar() {
  const [openNotif, setOpenNotif] = useState(false);

  return (
    <nav className="bg-white border-b shadow-md sticky top-0 z-50 px-4 py-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          🏥 HealthHub
        </Link>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <ServicesMenu />

          {/* Notification Bell */}
          <div className="relative">
            <button onClick={() => setOpenNotif(!openNotif)}>
              <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </button>
            {openNotif && <NotificationDropdown />}
          </div>

          {/* Avatar/UserMenu */}
          
        </div>
      </div>
    </nav>
  );
}
