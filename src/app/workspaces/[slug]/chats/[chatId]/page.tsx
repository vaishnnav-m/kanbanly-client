"use client";
import ChatPageTemplate from "@/components/templates/chat/ChatPageTemplate";
import { useParams } from "next/navigation";

function ChatPage() {
  const params = useParams();

  return (
    <main
      style={{
        minHeight: "calc(100vh - 75px)",
        maxHeight: "calc(100vh - 75px)",
      }}
      className="flex flex-col"
    >
      <ChatPageTemplate chatId={params.chatId as string} />
    </main>
  );
}

export default ChatPage;
