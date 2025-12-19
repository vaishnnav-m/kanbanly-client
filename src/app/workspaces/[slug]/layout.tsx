"use client";
import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "@/contexts/SocketContext";
import { RootState } from "@/store";
import { AIChat } from "@/components/organisms/ai-chat/AIChat";

export default function WorkspacesLayout({ children }: { children: ReactNode }) {
  const workSpaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );
  const { joinWorkspaceRoom, isConnected } = useSocket();

  useEffect(() => {
    if (workSpaceId && isConnected) {
      joinWorkspaceRoom(workSpaceId);
    }
  }, [workSpaceId, joinWorkspaceRoom, isConnected]);

  return (
    <div className="relative min-h-screen">
      {children}
      <AIChat />
    </div>
  );
}
