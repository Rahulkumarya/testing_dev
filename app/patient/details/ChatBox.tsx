"use client";

import { useSocket } from "../../context/SocketContext";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { CheckCheck } from "lucide-react";

// Add `receiverId` as a prop to know whom you're chatting with
const ChatBox = ({ receiverId }: { receiverId: string }) => {
  const { socket, isConnected } = useSocket();
  const [messages, setMessages] = useState<
    { text: string; from: string; time: string }[]
  >([]);
  const [input, setInput] = useState("");




  const sendMessage = () => {
    if (!socket || !input.trim()) return console.log(`return after send`);
    if (!receiverId) return console.error("❌ receiverId missing");

    const msg = { text: input, to: receiverId };
    console.log("📨 Sending message to:", receiverId); // ✅ DEBUG
    socket.emit("send_message", msg);

    setMessages((prev) => [
      ...prev,
      { ...msg, from: "me", time: dayjs().format("hh:mm A") },
    ]);
    setInput("");
  };
  // Listen for incoming messages from socket
  useEffect(() => {
    if (!socket) return;

    socket.on("new_message", (message) => {
      setMessages((prev) => [
        ...prev,
        { ...message, from: "other", time: dayjs().format("hh:mm A") },
      ]);
    });

    return () => {
      socket.off("new_message");
    };
  }, [socket]);

  


  return (
    <div className="max-w-md mx-auto p-4 border rounded-xl shadow-xl bg-white h-[500px] flex flex-col">
      <h2 className="text-xl font-semibold mb-2">Chat</h2>
      <p className="mb-4 text-sm text-gray-600">
        Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
      </p>

      {/* Chat message area */}
      <div className="flex-1 overflow-y-auto space-y-2 p-2 border rounded-lg bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.from === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`relative max-w-xs rounded-2xl px-4 py-2 text-sm shadow-sm 
                ${
                  msg.from === "me"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
            >
              {msg.text}
              <div
                className={`flex items-center gap-1 mt-1 text-xs ${
                  msg.from === "me" ? "text-white/80" : "text-black/50"
                }`}
              >
                {msg.time}
                {msg.from === "me" && <CheckCheck className="w-4 h-4 ml-1" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input + send button */}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
