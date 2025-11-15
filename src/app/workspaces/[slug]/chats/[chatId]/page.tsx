"use client";
import ChatPageTemplate from "@/components/templates/chat/ChatPageTemplate";
import { useSocket } from "@/contexts/SocketContext";
import { useGetOneChat } from "@/lib/hooks/useChat";
import { RootState } from "@/store";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function ChatPage() {
  const params = useParams();
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );
  const { data: chatData } = useGetOneChat(
    workspaceId,
    params.chatId as string
  );

  const { joinRooms } = useSocket();

  useEffect(() => {
    if (workspaceId && params.chatId) {
      joinRooms(workspaceId, params.chatId as string);
    }
  }, [workspaceId, joinRooms, params.chatId]);

  return (
    <main
      style={{
        minHeight: "calc(100vh - 75px)",
        maxHeight: "calc(100vh - 75px)",
      }}
      className="flex flex-col"
    >
      <ChatPageTemplate
        chatId={params.chatId as string}
        chatInfo={chatData?.data}
      />
    </main>
  );
}

export default ChatPage;
