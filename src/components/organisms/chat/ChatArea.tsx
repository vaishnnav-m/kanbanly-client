import { useEffect, useRef } from "react";
import { MessageBubble } from "@/components/molecules/chat/MessageBubble";
import { MessageResponse } from "@/lib/api/message/message.types";

interface MessageAreaProps {
  chatId: string;
  messages: MessageResponse[];
}

export const MessageArea = ({ chatId, messages }: MessageAreaProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatId]);

  return (
    <div className="flex-1 overflow-y-auto min-h-0">
      <div className="flex flex-col justify-end min-h-full px-6 py-4 space-y-4">
        {/* <DateSeparator date="Today" /> */}

        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message}
            showSender={
              index === 0 || messages[index - 1].sender !== message.sender
            }
          />
        ))}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
