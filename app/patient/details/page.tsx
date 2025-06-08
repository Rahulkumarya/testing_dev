// pages/chat/[receiverId].tsx
"use client";

import { useParams } from "next/navigation";
// import ChatBox from "./components/ChatBox";
import ChatBox from "./ChatBox";

export default function ChatPage() {
  const params = useParams();
  const receiverId = params?.receiverId as string | undefined;

  if (!receiverId) return <p>Loading...</p>;

  return <ChatBox receiverId={receiverId} />;
}
