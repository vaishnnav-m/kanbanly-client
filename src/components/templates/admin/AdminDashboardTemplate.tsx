"use client";
import ChartSkeleton from "@/components/organisms/admin/ChartSkelton";
import MetricsCards from "@/components/organisms/admin/MetricsCards";
import MetricsCardsSkeleton from "@/components/organisms/admin/MetricsCardSkelton";
import PlanBreakdown from "@/components/organisms/admin/PlanBreakDown";
import ProjectStats from "@/components/organisms/admin/ProjectStats";
import RecentTransactions from "@/components/organisms/admin/RecentTransactions";
import SalesChart from "@/components/organisms/admin/SalesChart";
import TableSkeleton from "@/components/organisms/admin/TableSkelton";
import UserActivity from "@/components/organisms/admin/UserActivityChart";
import { useEffect, useState } from "react";

// interface AdminDashboardTemplateProps {}

function AdminDashboardTemplate() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">Dashboard</h1>
      {/* Dashboard Content */}
      <div className="space-y-8 animate-fade-in">
        {/* Overview Metrics */}
        {isLoading ? <MetricsCardsSkeleton /> : <MetricsCards />}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <SalesChart />
              <UserActivity />
            </>
          )}
        </div>

        {/* Plan Breakdown and Project Stats */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            {isLoading ? <TableSkeleton rows={4} /> : <PlanBreakdown />}
          </div>
          {isLoading ? <TableSkeleton rows={1} /> : <ProjectStats />}
        </div>

        {/* Recent Transactions */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {isLoading ? (
            <>
              <TableSkeleton rows={5} />
              <TableSkeleton rows={2} />
            </>
          ) : (
            <>
              <RecentTransactions />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardTemplate;
