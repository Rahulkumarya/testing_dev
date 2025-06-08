// context/SocketContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";

interface ISocketContext {
  socket: Socket | null;
  isConnected: boolean;
}
const SocketContext = createContext<ISocketContext>({
  socket: null,
  isConnected: false,
});
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  // 👇 Get the logged-in userId from Redux
  const userId = useSelector((state: store) => state.auth.user?._id);

 console.log(`socketContext id ${userId}`)
  useEffect(() => {
    if (!userId || socketRef.current) return;

    const socket = io("http://localhost:5000", {
      query: { userId },
      transports: ["websocket"],
      withCredentials: true,
    });
    socketRef.current = socket;

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
