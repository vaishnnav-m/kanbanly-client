"use client";
import { MessageArea } from "@/components/organisms/chat/ChatArea";
import { ChatHeader } from "@/components/organisms/chat/ChatHeader";
import { MessageInput } from "@/components/organisms/chat/MessageInput";
import { useSocket } from "@/contexts/SocketContext";
import { ChatResponse } from "@/lib/api/chat/chat.types";

interface ChatAreaProps {
  chatId: string;
  chatInfo?: ChatResponse;
}

function ChatPageTemplate({ chatId, chatInfo }: ChatAreaProps) {
  const { sendMessage, messages } = useSocket();
  if (!chatInfo) {
    return;
  }

  const handleSendMessage = (text: string) => {
    sendMessage(chatId, text);
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <ChatHeader chatInfo={chatInfo} />
      <MessageArea chatId={chatId} messages={messages} />
      <MessageInput handleSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatPageTemplate;
