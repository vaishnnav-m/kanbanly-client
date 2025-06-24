"use client";
import { ThemeToggleButton } from "@/components/molecules/ThemeToggleButton";
import ChartSkeleton from "@/components/organisms/admin/ChartSkelton";
import MetricsCards from "@/components/organisms/admin/MetricsCards";
import MetricsCardsSkeleton from "@/components/organisms/admin/MetricsCardSkelton";
import PlanBreakdown from "@/components/organisms/admin/PlanBreakDown";
import ProjectStats from "@/components/organisms/admin/ProjectStats";
import RecentTransactions from "@/components/organisms/admin/RecentTransactions";
import SalesChart from "@/components/organisms/admin/SalesChart";
import TableSkeleton from "@/components/organisms/admin/TableSkelton";
import UserActivity from "@/components/organisms/admin/UserActivityChart";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

import { useEffect, useState } from "react";

interface AdminDashboardTemplateProps {
  handleLogout(): void;
}

function AdminDashboardTemplate({ handleLogout }: AdminDashboardTemplateProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="w-full flex justify-between py-5">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <ThemeToggleButton />
          {/* Logout Button */}
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-white transition-all duration-300`}
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

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
    </>
  );
}

export default AdminDashboardTemplate;
