// components/ChatBox.tsx
"use client";

import { useSocket } from "../../context/SocketContext";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { CheckCheck } from "lucide-react";

interface Message {
  text: string;
  from: string;
  time: string;
}

const ChatBox = ({ receiverId }: { receiverId: string }) => {
  const { socket, isConnected } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!socket) return;
    socket.on("new_message", (message: Message) => {
      setMessages((prev) => [
        { ...message, from: "other", time: dayjs().format("hh:mm A") },
        ...prev,
      ]);
    });
    return () => void socket.off("new_message");
  }, [socket]);

  const sendMessage = () => {
    if (!socket || !input.trim()) return;
    // 👇 Make sure receiverId is defined!
    console.log("📨 Emitting to:", receiverId);
    socket.emit("send_message", { to: receiverId, text: input });
    setMessages((prev) => [
      { text: input, from: "me", time: dayjs().format("hh:mm A") },
      ...prev,
    ]);
    setInput("");
  };

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col h-[500px] bg-white shadow-lg rounded-lg">
      <header className="mb-4">
        <h2 className="text-xl font-bold">Chat</h2>
        <p className="text-sm text-gray-600">
          Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
        </p>
      </header>
      <div className="flex-1 overflow-auto space-y-3 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.from === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-xl max-w-xs text-sm ${
                msg.from === "me"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
              <div className="mt-1 flex items-center text-xs opacity-75">
                {msg.time}
                {msg.from === "me" && <CheckCheck className="ml-1 w-4 h-4" />}
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message…"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default ChatBox;
