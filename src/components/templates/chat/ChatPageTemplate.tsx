"use client";
import { MessageArea } from "@/components/organisms/chat/ChatArea";
import { ChatHeader } from "@/components/organisms/chat/ChatHeader";
import { MessageInput } from "@/components/organisms/chat/MessageInput";

interface ChatAreaProps {
  chatId: string;
}

function ChatPageTemplate({ chatId }: ChatAreaProps) {
  const chatInfo: Record<
    string,
    { name: string; status: string; typing?: boolean }
  > = {
    "team-alpha": {
      name: "Team Alpha",
      status: "12 members",
    },
    "project-phoenix": {
      name: "Project Phoenix",
      status: "8 members",
    },
    "dm-sarah": {
      name: "Sarah Chen",
      status: "online",
      typing: true,
    },
    "dm-mike": {
      name: "Mike Johnson",
      status: "away - back in 30 min",
    },
    "project-launch": {
      name: "Launch Planning",
      status: "5 members",
    },
    "dm-emma": {
      name: "Emma Wilson",
      status: "last seen 2h ago",
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
