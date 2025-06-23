"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Progress } from "@/components/atoms/progress";
import { CheckCircle, Clock, Target } from "lucide-react";

const ProjectStats = () => {
  const stats = [
    {
      title: "Ongoing Projects",
      value: 15,
      total: 23,
      icon: Clock,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Completed Projects",
      value: 8,
      total: 23,
      icon: CheckCircle,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Tasks Completed Today",
      value: 24,
      total: 35,
      icon: Target,
      color: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
          Project Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className="space-y-3"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="font-medium text-gray-900 dark:text-white">
                  {stat.title}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {stat.value}/{stat.total}
              </span>
            </div>
            <Progress value={(stat.value / stat.total) * 100} className="h-2" />
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {Math.round((stat.value / stat.total) * 100)}% completion rate
            </p>
          </div>
        ))}

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Average Completion Time
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              4.2 days
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStats;
