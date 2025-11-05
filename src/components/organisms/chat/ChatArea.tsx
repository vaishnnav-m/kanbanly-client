import { DateSeparator } from "@/components/molecules/chat/DateSeparator";
import { MessageBubble } from "@/components/molecules/chat/MessageBubble";
import { useEffect, useRef } from "react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isSent: boolean;
  status: "sent" | "delivered" | "read";
  type: "text" | "image";
  imageUrl?: string;
}

interface MessageAreaProps {
  chatId: string;
}

const messages: Record<string, Message[]> = {
  "team-alpha": [
    {
      id: "1",
      sender: "Sarah Chen",
      content:
        "Hey team! Just finished the design mockups for the new dashboard.",
      timestamp: "10:30 AM",
      isSent: false,
      status: "read",
      type: "text",
    },
    {
      id: "2",
      sender: "You",
      content: "Looks great! Can you share the Figma link?",
      timestamp: "10:32 AM",
      isSent: true,
      status: "read",
      type: "text",
    },
    {
      id: "3",
      sender: "Sarah Chen",
      content: "Of course! Here it is: figma.com/file/...",
      timestamp: "10:33 AM",
      isSent: false,
      status: "read",
      type: "text",
    },
    {
      id: "4",
      sender: "Mike Johnson",
      content: `I'll review the backend integration today.
       Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Molestiae architecto quas a obcaecati modi tempore labore nihil? Minus quos sit aut, vero fugit debitis deserunt odio ducimus, in, nihil excepturi.`,
      timestamp: "10:45 AM",
      isSent: false,
      status: "read",
      type: "text",
    },
    {
      id: "5",
      sender: "You",
      content:
        "Perfect! Let me know if you need any help with the API endpoints.",
      timestamp: "10:47 AM",
      isSent: true,
      status: "delivered",
      type: "text",
    },
  ],
  "dm-sarah": [
    {
      id: "1",
      sender: "Sarah Chen",
      content: "Hey! Do you have a minute to review the PR?",
      timestamp: "2:15 PM",
      isSent: false,
      status: "read",
      type: "text",
    },
    {
      id: "2",
      sender: "You",
      content: "Sure! Let me take a look right now.",
      timestamp: "2:16 PM",
      isSent: true,
      status: "read",
      type: "text",
    },
    {
      id: "3",
      sender: "You",
      content:
        "Just left some comments. Overall looks good, just a few minor suggestions. ",
      timestamp: "2:25 PM",
      isSent: true,
      status: "delivered",
      type: "text",
    },
  ],
};

export const MessageArea = ({ chatId }: MessageAreaProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMessages = messages[chatId] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatId]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      <DateSeparator date="Today" />

      {chatMessages.map((message, index) => (
        <MessageBubble
          key={message.id}
          message={message}
          showSender={
            index === 0 || chatMessages[index - 1].sender !== message.sender
          }
        />
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
};
