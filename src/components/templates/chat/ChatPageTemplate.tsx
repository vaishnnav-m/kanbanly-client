"use client";
import { useEffect, useState } from "react";
import { MessageArea } from "@/components/organisms/chat/ChatArea";
import { ChatHeader } from "@/components/organisms/chat/ChatHeader";
import { MessageInput } from "@/components/organisms/chat/MessageInput";
import { useSocket } from "@/contexts/SocketContext";
import { ChatResponse } from "@/lib/api/chat/chat.types";
import { MessageResponse } from "@/lib/api/message/message.types";
import { ChatProjectMembers } from "@/components/organisms/chat/ChatProjectMembers";

interface ChatAreaProps {
  chatId: string;
  chatInfo?: ChatResponse;
  messageHistory: MessageResponse[];
  workspaceId: string;
}

function ChatPageTemplate({
  chatId,
  chatInfo,
  messageHistory,
  workspaceId,
}: ChatAreaProps) {
  const { sendMessage, messages: socketMessages } = useSocket();
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [showMembers, setShowMembers] = useState(false);

  useEffect(() => {
    const combinedMessages = [...messageHistory];

    socketMessages.forEach((scktmsg) => {
      if (scktmsg.chatId === chatId) {
        const isDuplicate = combinedMessages.some(
          (msg) => msg.text === scktmsg.text && msg.sender === scktmsg.sender
        );

        if (!isDuplicate) {
          combinedMessages.push(scktmsg);
        }
      }
    });

    setMessages(combinedMessages);
  }, [messageHistory, socketMessages, chatId]);

  if (!chatInfo) {
    return;
  }

  const handleSendMessage = (text: string) => {
    sendMessage(chatId, text);
  };

  return (
    <div className="flex flex-1 min-h-0">
      <div className="flex-1 flex flex-col bg-background min-h-0">
        <ChatHeader
          chatInfo={chatInfo}
          onToggleMembers={() => setShowMembers(!showMembers)}
        />
        <MessageArea chatId={chatId} messages={messages} />
        <MessageInput handleSendMessage={handleSendMessage} />
      </div>
      {chatInfo.type === "project" && showMembers && (
        <ChatProjectMembers
          workspaceId={workspaceId}
          projectId={chatInfo.projectId as string}
        />
      )}
    </div>
  );
}

export default ChatPageTemplate;
