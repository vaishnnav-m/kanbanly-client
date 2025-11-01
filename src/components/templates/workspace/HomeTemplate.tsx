"use client";
import DashboardFilters from "@/components/organisms/workspace/DashboardFilters";
import { SummaryCards } from "@/components/organisms/workspace/SummaryCard";
import { TaskAnalytics } from "@/components/organisms/workspace/TaskAnalytics";
import { TeamPerformance } from "@/components/organisms/workspace/TeamPerformance";
import { IProject } from "@/lib/api/project/project.types";

interface HomeTemplateProps {
  projects: IProject[];
}

function HomeTemplate({}: HomeTemplateProps) {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-6 lg:p-8 space-y-8">
        <DashboardFilters />

        <section>
          <SummaryCards />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Task Analytics</h2>
          <TaskAnalytics />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Team Performance</h2>
          <TeamPerformance />
        </section>
      </div>
    </main>
  );
}

export default HomeTemplate;
