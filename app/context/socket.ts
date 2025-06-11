// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useRef,
//   ReactNode,
// } from "react";
// import { io, Socket } from "socket.io-client";
// import { store } from "../../redux/store";
// import { useSelector } from "react-redux";



// // Create a Context for the socket instance
// const SocketContext = createContext<Socket | null>(null);

// interface SocketProviderProps {
//   children: ReactNode;
// }

// export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
//   // Get the logged-in user's ID from Redux
//   const userId = useSelector((state: store) => state.auth.user?._id);

//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     // Only initialize socket once we have a userId
//     if (!userId) return;

//     // Connect to Socket.IO server
//     const socket: Socket = io("http://localhost:5000", {
//       query: { userId },
//       transports: ["websocket"],
//       withCredentials: true,
//     });

//     socketRef.current = socket;

//     // Log connection events
//     socket.on("connect", () => console.log("Socket connected:", socket.id));
//     socket.on("disconnect", () => console.log("Socket disconnected"));

//     // Clean up on unmount or userId change
//     return () => {
//       socket.disconnect();
//       socketRef.current = null;
//     };
//   }, [userId]);

//   return (
//     <SocketContext.Provider value={socketRef.current}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// // Custom hook to access the socket instance
// export const useSocket = (): Socket => {
//   const socket = useContext(SocketContext);
//   if (!socket) {
//     throw new Error("useSocket must be used within a SocketProvider");
//   }
//   return socket;
// };
