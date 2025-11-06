"use client";
import { MessageArea } from "@/components/organisms/chat/ChatArea";
import { ChatHeader } from "@/components/organisms/chat/ChatHeader";
import { MessageInput } from "@/components/organisms/chat/MessageInput";

interface ChatAreaProps {
  chatId: string;
}

function ChatPageTemplate({ chatId }: ChatAreaProps) {
  console.log("chatId", chatId);
  const chatInfo: Record<
    string,
    { name: string; status: string; typing?: boolean }
  > = {
    "team-alpha": {
      name: "Team Alpha",
      status: "12 members",
    },
    "dm-sarah": {
      name: "Sarah Chen",
      status: "online",
      typing: true,
    },
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <ChatHeader chatId={chatId} chatInfo={chatInfo} />
      <MessageArea chatId={chatId} />
      <MessageInput />
    </div>
  );
}

export default ChatPageTemplate;
