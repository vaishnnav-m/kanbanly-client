"use client";
import DashboardFilters from "@/components/organisms/workspace/DashboardFilters";
import { SummaryCards } from "@/components/organisms/workspace/SummaryCard";
import { TaskAnalytics } from "@/components/organisms/workspace/TaskAnalytics";
import { TeamPerformance } from "@/components/organisms/workspace/TeamPerformance";
import { IDashboardResponse } from "@/lib/api/workspace/workspace.types";

interface HomeTemplateProps {
  dashboardData: IDashboardResponse;
}

function HomeTemplate({ dashboardData }: HomeTemplateProps) {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-6 lg:p-8 space-y-8">
        <DashboardFilters />

        <section>
          <SummaryCards summaryDataValues={dashboardData.workspaceSummary} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Task Analytics</h2>
          <TaskAnalytics
            completionData={dashboardData.taskAnalytics.completionData}
            progressData={dashboardData.taskAnalytics.progressData}
            trendData={dashboardData.taskAnalytics.trendData}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Team Performance</h2>
          <TeamPerformance
            topPerformers={dashboardData.teamPerformance.topPerformers}
            workloadData={dashboardData.teamPerformance.workloadData}
            productivity={dashboardData.teamPerformance.productivityScore}
          />
        </section>
      </div>
    </main>
  );
}

export default HomeTemplate;
