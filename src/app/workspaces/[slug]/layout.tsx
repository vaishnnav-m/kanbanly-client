"use client";

import { useSocket } from "@/contexts/SocketContext";
import { RootState } from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function WorkspaceSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { joinRooms } = useSocket();
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );

  useEffect(() => {
    if (workspaceId) {
      joinRooms(workspaceId);
    }
  }, [workspaceId, joinRooms]);

  return <>{children}</>;
}
