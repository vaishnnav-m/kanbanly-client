"use client";
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  DollarSign,
} from "lucide-react";
import { Card, CardContent } from "@/components/atoms/card";
import { AnalyticsSummary } from "@/lib/api/admin/admin.types";

interface MetricsCardsProps {
  summary: AnalyticsSummary;
}

const MetricsCards = ({ summary }: MetricsCardsProps) => {
  const metrics = [
    {
      title: "Total Sales",
      value: `${summary.totalActiveSubscriptions} sales`,
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "from-green-400 to-green-600",
    },
    {
      title: "Total Users",
      value: summary.totalUsers,
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Active Users",
      value: summary.activeUsers,
      change: "+15.3%",
      trend: "up",
      icon: TrendingUp,
      color: "from-purple-400 to-purple-600",
    },
    {
      title: "Total Projects",
      value: summary.totalProjects,
      change: "-2.1%",
      trend: "down",
      icon: FileText,
      color: "from-orange-400 to-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card
          key={metric.title}
          className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white dark:bg-gray-800"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.value}
                </p>
                <div className="flex items-center gap-1">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      metric.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    vs last month
                  </span>
                </div>
              </div>
              <div
                className={`p-3 rounded-full bg-gradient-to-r ${metric.color}`}
              >
                <metric.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsCards;
