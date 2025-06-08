"use client"
import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { Bell } from "lucide-react";

interface Notification {
  type: string;
  title: string;
  message: string;
  icon?: string;
  data?: any;
}

export const NotificationIcon: React.FC = () => {
  const { socket } = useSocket();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!socket) return;

    // Listen for server notifications
    socket.on("notification", (payload: Notification, ackFn?: () => void) => {
      // Add to local list
      setNotifications((prev) => [payload, ...prev]);
      // Send acknowledgement to server if provided
      if (typeof ackFn === "function") ackFn();
    });

    return () => {
      socket.off("notification");
    };
  }, [socket]);

  // Mark all as read when dropdown opens
  const handleToggle = () => {
    setOpen(!open);
    if (!open) {
      // could call API to mark read here
      setNotifications([]);
    }
  };

  return (
    <div className="relative">
      <button onClick={handleToggle} className="p-2">
        <Bell />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-2">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500">No new notifications</p>
          ) : (
            notifications.map((n, i) => (
              <div
                key={i}
                className="border-b last:border-none p-2 hover:bg-gray-100 cursor-pointer"
              >
                <p className="font-semibold">{n.title}</p>
                <p className="text-sm">{n.message}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
