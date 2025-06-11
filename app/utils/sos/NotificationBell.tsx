// // components/NotificationBell.tsx
// "use client";

// import { useEffect, useRef, useState } from "react";
// import {
//   useGetNotificationsQuery,
//   useMarkAllAsReadMutation,
// } from "../../../redux/features/patients/notificationApi";
// import {useSocket} from "../../context/SocketContext";

// interface Props {
//   userId: string;
// }

// const NotificationBell = ({ userId }: Props) => {
//   const bellRef = useRef<HTMLDivElement>(null); // to detect clicks outside
//   const [isOpen, setIsOpen] = useState(false); // toggle dropdown open/close

//   const socket =useSocket();
//   // 1️⃣ Fetch notifications for this userId
//   //    `data` is the array, `refetch` allows manual re-fetch on socket event
//   const {
//     data: notifications = [],
//     isLoading,
//     refetch,
//   } = useGetNotificationsQuery(userId, {
//     skip: !userId, // don't run query until we have a userId
//   });

//   // 2️⃣ Mutation to mark all notifications as read
//   const [markAllAsRead, { isLoading: isMarking }] = useMarkAllAsReadMutation();

//   // 3️⃣ Listen for real-time notifications and refetch
//   useEffect(() => {
//     if (!userId) return;

//     // Join the user's socket room
//     // socket.emit("join", userId);

//     // On new notification, refetch the RTK Query cache
//     socket.on("notification", () => {
//       refetch();
//     });

//     return () => {
//       socket.off("notification");
//     };
//   }, [userId, refetch]);

//   // 4️⃣ Close dropdown when clicking outside of it
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       void document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // 5️⃣ Calculate unread count
//   const unreadCount = notifications.filter((n) => !n.isRead).length;

//   return (
//     <div ref={bellRef} className="relative">
//       {/* 🔔 Bell icon with unread badge */}
//       <button
//         onClick={() => setIsOpen((open) => !open)}
//         className="relative p-2 text-gray-700 hover:text-blue-600 transition"
//         aria-label="Notifications"
//       >
//         🔔
//         {unreadCount > 0 && (
//           <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white rounded-full px-1.5">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {/* ▼ Dropdown */}
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-80 max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeIn">
//           {/* Header: Title + 'Mark all as read' button */}
//           <div className="flex justify-between items-center px-4 py-2 border-b">
//             <span className="font-semibold text-sm text-gray-700">
//               Notifications
//             </span>
//             <button
//               onClick={() => markAllAsRead(userId)}
//               className="text-sm text-blue-600 hover:underline disabled:opacity-50"
//               disabled={isLoading || isMarking}
//             >
//               Mark all as read
//             </button>
//           </div>

//           {/* Body: List or Loading / Empty states */}
//           <ul className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//             {isLoading ? (
//               <li className="p-4 text-center text-sm text-gray-500">
//                 Loading…
//               </li>
//             ) : notifications.length === 0 ? (
//               <li className="p-4 text-center text-sm text-gray-500">
//                 No notifications
//               </li>
//             ) : (
//               notifications.map((n) => (
//                 <li
//                   key={n.id}
//                   className={`px-4 py-2 text-sm border-b last:border-none ${
//                     !n.isRead ? "bg-gray-100 font-medium" : "text-gray-600"
//                   }`}
//                 >
//                   {n.message}
//                   <div className="text-[11px] text-gray-400">
//                     {new Date(n.createdAt).toLocaleTimeString()}
//                   </div>
//                 </li>
//               ))
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationBell;












// //2nd 
"use client";

import { useEffect, useRef, useState } from "react";
import {
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
} from "../../../redux/features/patients/notificationApi";
import { useSocket } from "../../context/SocketContext";

interface Props {
  userId: string;
}

const NotificationBell = ({ userId }: Props) => {
  const bellRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const {socket} = useSocket();

  // Fetch & cache notifications
  const {
    data: notifications = [],
    isLoading,
    refetch,
  } = useGetNotificationsQuery(userId, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  const [markAllAsRead, { isLoading: isMarking }] = useMarkAllAsReadMutation({
    refetchOnMountOrArgChange: true,
  });



  useEffect(() => {
    if (!userId || !socket) return;

    // Join the user's socket room
    console.log("Joining socket room for:", userId);
    socket.emit("join", userId);

    // Listen for new notifications
    socket.on("notification", () => {
      console.log("New notification received");
      refetch();
    });

    return () => {
      socket.off("notification");
    };
  }, [socket, userId, refetch]);
  // Join room & listen for real-time updates
  useEffect(() => {
    if (!userId || !socket) return;
    console.log("Joining socket room for:", userId);
    socket.emit("join", userId);
    socket.emit("join", userId);

    socket.on("notification", (data) => {
      console.log("New notification received",data);
      refetch();
    });

    return () => {
      socket.off("notification");
    };
  }, [socket, userId, refetch]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div ref={bellRef} className="relative">
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="relative p-2 text-gray-700 hover:text-blue-600 transition"
        aria-label="Notifications"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white rounded-full px-1.5">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-w-xs bg-white border rounded shadow-lg z-50 animate-fadeIn">
          <div className="flex justify-between items-center px-4 py-2 border-b">
            <span className="font-semibold text-sm text-gray-700">
              Notifications
            </span>
            <button
              onClick={() => markAllAsRead(userId)}
              disabled={isLoading || isMarking}
              className="text-sm text-blue-600 hover:underline disabled:opacity-50"
            >
              Mark all as read
            </button>
          </div>

          <ul className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
            {isLoading ? (
              <li className="p-4 text-center text-sm text-gray-500">
                Loading…
              </li>
            ) : notifications.length === 0 ? (
              <li className="p-4 text-center text-sm text-gray-500">
                No notifications
              </li>
            ) : (
              notifications.map((n) => (
                <li
                  key={n.id}
                  className={`px-4 py-2 text-sm border-b last:border-none ${
                    !n.isRead ? "bg-gray-100 font-medium" : "text-gray-600"
                  }`}
                >
                  {n.message}
                  <div className="text-[11px] text-gray-400">
                    {new Date(n.createdAt).toLocaleTimeString()}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
