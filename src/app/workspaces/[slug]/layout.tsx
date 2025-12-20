"use client";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "@/contexts/SocketContext";
import { RootState } from "@/store";
import { AIChat } from "@/components/organisms/ai-chat/AIChat";
import { useChatAi } from "@/lib/hooks/useAiChat";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function WorkspacesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );
  const { joinWorkspaceRoom, isConnected } = useSocket();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your Kanbanly AI assistant. I can help you manage your workspace. You can ask me how to use the tool (e.g., 'How do I create a sprint?') or give me direct instructions (e.g., 'Create a task named Prepare Report'). How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const { mutate: chatAi, isPending: isGenerating } = useChatAi({
    onSuccess(data) {
      const newMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.data as string,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);
    },
  });

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    chatAi({ question: inputValue, workspaceId });
  };

  useEffect(() => {
    if (workspaceId && isConnected) {
      joinWorkspaceRoom(workspaceId);
    }
  }, [workspaceId, joinWorkspaceRoom, isConnected]);

  return (
    <div className="relative min-h-screen">
      {children}
      <AIChat
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSend={handleSend}
        isGenerating={isGenerating}
      />
    </div>
  );
}
