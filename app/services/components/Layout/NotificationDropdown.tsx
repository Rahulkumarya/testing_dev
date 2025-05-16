"use client";

export default function NotificationDropdown() {
  const notifications = ["Ambulance request received", "New pharmacy order"];

  return (
    <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-72 border z-50">
      <div className="p-3 font-semibold border-b">Notifications</div>
      <ul className="max-h-60 overflow-y-auto">
        {notifications.map((n, idx) => (
          <li
            key={idx}
            className="px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
          >
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}
