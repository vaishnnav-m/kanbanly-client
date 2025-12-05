"use client";
import { ReactNode, useEffect } from "react";
import { useSocket } from "@/contexts/SocketContext";
import { useParams } from "next/navigation";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  const params = useParams();
  const projectId = params.projectId as string;

  const { joinProjectRoom, isConnected } = useSocket();

  useEffect(() => {
    if (projectId && isConnected) {
      joinProjectRoom(projectId);
    }
  }, [projectId, joinProjectRoom, isConnected]);

  return <div>{children}</div>;
}
