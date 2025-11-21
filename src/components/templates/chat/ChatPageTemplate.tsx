"use client";
import { MessageArea } from "@/components/organisms/chat/ChatArea";
import { ChatHeader } from "@/components/organisms/chat/ChatHeader";
import { MessageInput } from "@/components/organisms/chat/MessageInput";
import { useSocket } from "@/contexts/SocketContext";
import { ChatResponse } from "@/lib/api/chat/chat.types";
import { MessageResponse } from "@/lib/api/message/message.types";
import { useEffect, useState } from "react";

interface ChatAreaProps {
  chatId: string;
  chatInfo?: ChatResponse;
  messageHistory: MessageResponse[];
}

function ChatPageTemplate({ chatId, chatInfo, messageHistory }: ChatAreaProps) {
  const { sendMessage, messages: socketMessages } = useSocket();
  const [messages, setMessages] = useState<MessageResponse[]>([]);

  console.log("messages", messageHistory);

  useEffect(() => {
    const combinedMessages = [...messageHistory];

    socketMessages.forEach((scktmsg) => {
      const isDuplicate = combinedMessages.some(
        (msg) => msg.text === scktmsg.text && msg.sender === scktmsg.sender
      );

      if (!isDuplicate) {
        combinedMessages.push(scktmsg);
      }
    });

    setMessages(combinedMessages);
  }, [messageHistory, socketMessages]);

  if (!chatInfo) {
    return;
  }

  const handleSendMessage = (text: string) => {
    sendMessage(chatId, text);
  };

  console.log("messages", messages);
  console.log("socketMessages", socketMessages);
  console.log("messageHistory", messageHistory);

  return (
    <div className="flex-1 flex flex-col bg-background">
      <ChatHeader chatInfo={chatInfo} />
      <MessageArea chatId={chatId} messages={messages} />
      <MessageInput handleSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatPageTemplate;
