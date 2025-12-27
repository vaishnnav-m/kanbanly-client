"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import ChatPageTemplate from "@/components/templates/chat/ChatPageTemplate";
import { useSocket } from "@/contexts/SocketContext";
import { useGetOneChat } from "@/lib/hooks/useChat";
import { RootState } from "@/store";
import { useGetChatMessages } from "@/lib/hooks/useMessage";

function ChatPage() {
  const params = useParams();
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );
  const chatId = params.chatId as string;
  const { data: chatData } = useGetOneChat(workspaceId, chatId);

  const { data: messageHistoryData } = useGetChatMessages(workspaceId, chatId);

  const { joinChatRoom, isConnected } = useSocket();

  useEffect(() => {
    if (params.chatId && isConnected) {
      joinChatRoom(params.chatId as string);
    }
  }, [joinChatRoom, params.chatId, isConnected]);

  return (
    <main className="flex flex-col h-[calc(100svh-75px)] overflow-hidden">
      <ChatPageTemplate
        chatId={params.chatId as string}
        chatInfo={chatData?.data}
        messageHistory={messageHistoryData?.data || []}
        workspaceId={workspaceId}
      />
    </main>
  );
}

export default ChatPage;
