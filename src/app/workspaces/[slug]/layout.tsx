"use client";
import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "@/contexts/SocketContext";
import { RootState } from "@/store";

export default function Layout({ children }: { children: ReactNode }) {
  const workSpaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );
  const { joinWorkspaceRoom, isConnected } = useSocket();

  useEffect(() => {
    if (workSpaceId && isConnected) {
      joinWorkspaceRoom(workSpaceId);
    }
  }, [workSpaceId, joinWorkspaceRoom, isConnected]);

  return <div>{children}</div>;
}
