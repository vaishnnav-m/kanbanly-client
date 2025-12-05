"use client";
import ChartSkeleton from "@/components/organisms/admin/ChartSkelton";
import MetricsCards from "@/components/organisms/admin/MetricsCards";
import MetricsCardsSkeleton from "@/components/organisms/admin/MetricsCardSkelton";
import PlanBreakdown from "@/components/organisms/admin/PlanBreakDown";
import SalesChart from "@/components/organisms/admin/SalesChart";
import TableSkeleton from "@/components/organisms/admin/TableSkelton";
import UserActivity from "@/components/organisms/admin/UserActivityChart";
import { AnalyticsResponse } from "@/lib/api/admin/admin.types";
import { useEffect, useState } from "react";

interface AdminDashboardTemplateProps {
  analytics: AnalyticsResponse;
}

function AdminDashboardTemplate({ analytics }: AdminDashboardTemplateProps) {
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
        {isLoading ? (
          <MetricsCardsSkeleton />
        ) : (
          <MetricsCards summary={analytics.summary} />
        )}

        <div className="">
          <div className="xl:col-span-2">
            {isLoading ? (
              <ChartSkeleton />
            ) : (
              <SalesChart sales={analytics.salesAnalytics} />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {isLoading ? (
            <>
              <TableSkeleton rows={4} />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <PlanBreakdown planBreakdown={analytics.planBreakdown} />
              <UserActivity userAnalytics={analytics.userAnalytics} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardTemplate;
