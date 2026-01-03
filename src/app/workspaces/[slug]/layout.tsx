"use client";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "@/contexts/SocketContext";
import { RootState } from "@/store";
import { AIChat } from "@/components/organisms/ai-chat/AIChat";
import { useChatAi } from "@/lib/hooks/useAiChat";
import { AiMessage } from "@/lib/api/ai/ai.types";
import { useParams } from "next/navigation";

export default function WorkspacesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );
  const params = useParams();
  const { joinWorkspaceRoom, isConnected } = useSocket();
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your Kanbanly AI assistant. I can help you manage your workspace. You can ask me how to use the tool (e.g., 'How do I create a sprint?') or give me direct instructions (e.g., 'Create a task named Prepare Report'). How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const { mutate: chatAi, isPending: isGenerating } = useChatAi({
    onSuccess(data) {
      const newMessage: AiMessage = {
        role: "assistant",
        content: data.data as string,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);
    },
  });

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: AiMessage = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    const prevMessages = messages;
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    chatAi({
      ...(params.projectId && { projectId: params.projectId as string }),
      question: inputValue,
      workspaceId,
      prevMessages,
    });
  };

  useEffect(() => {
    if (workspaceId && isConnected) {
      joinWorkspaceRoom(workspaceId);
    }
  }, [workspaceId, joinWorkspaceRoom, isConnected]);

  return (
    <div className="relative">
      {children}
      <AIChat
        setMessages={setMessages}
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSend={handleSend}
        isGenerating={isGenerating}
      />
    </div>
  );
}
