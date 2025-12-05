import { FolderKanban, Users, CheckCircle2, Activity } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent } from "@/components/atoms/card";
import { IWorkspaceSummaryResponse } from "@/lib/api/workspace/workspace.types";

interface SummaryCardProps {
  summaryDataValues: IWorkspaceSummaryResponse;
}

export function SummaryCards({ summaryDataValues }: SummaryCardProps) {
  const summaryData = [
    {
      title: "Total Projects",
      value: summaryDataValues.totalProjects,
      change: `+${summaryDataValues.projectsThisMonth} this month`,
      icon: FolderKanban,
      color: "text-primary",
    },
    {
      title: "Active Members",
      value: summaryDataValues.activeMembers,
      change: `+${summaryDataValues.membersThisWeek} this week`,
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "Ongoing Tasks",
      value: summaryDataValues.ongoingTasks,
      change: `${summaryDataValues.completionRate}% completed`,
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      title: "Recent Activities",
      value: summaryDataValues.recentActivities,
      change: `last activity ${formatDistanceToNow(
        summaryDataValues.lastActivity
      )}`,
      icon: Activity,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryData.map((item) => {
        const Icon = item.icon;
        return (
          <Card
            key={item.title}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </p>
                  <p className="text-3xl font-bold">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.change}</p>
                </div>
                <div className={`p-3 rounded-lg bg-muted ${item.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
