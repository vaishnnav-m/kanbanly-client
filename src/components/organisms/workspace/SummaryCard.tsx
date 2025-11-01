import { Card, CardContent } from "@/components/atoms/card";
import { FolderKanban, Users, CheckCircle2, Activity } from "lucide-react";

const summaryData = [
  {
    title: "Total Projects",
    value: "24",
    change: "+3 this month",
    icon: FolderKanban,
    color: "text-primary",
  },
  {
    title: "Active Members",
    value: "156",
    change: "+12 this week",
    icon: Users,
    color: "text-green-500",
  },
  {
    title: "Ongoing Tasks",
    value: "892",
    change: "67% completed",
    icon: CheckCircle2,
    color: "text-green-500",
  },
  {
    title: "Recent Activities",
    value: "1,234",
    change: "Today",
    icon: Activity,
    color: "text-orange-500",
  },
];

export function SummaryCards() {
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
