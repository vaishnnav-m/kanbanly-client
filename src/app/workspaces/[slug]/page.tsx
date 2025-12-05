"use client";
import HomeTemplate from "@/components/templates/workspace/HomeTemplate";
import { useGetDashboardData } from "@/lib/hooks/useWorkspace";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function WorkspaceDashboardPage() {
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );

  const { data: dashboardData } = useGetDashboardData(workspaceId);

  if (!dashboardData?.data) {
    return;
  }

  return (
    <div>
      <HomeTemplate dashboardData={dashboardData.data} />
    </div>
  );
}
