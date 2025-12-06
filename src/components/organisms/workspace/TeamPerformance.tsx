import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Progress } from "@/components/atoms/progress";
import {
  ITopPerformer,
  IWorkloadItem,
} from "@/lib/api/workspace/workspace.types";
import { TrendingUp, Award } from "lucide-react";

interface TeamPerformanceProps {
  workloadData: IWorkloadItem[];
  topPerformers: ITopPerformer[];
  productivity: number;
}

export function TeamPerformance({
  topPerformers,
  workloadData,
  productivity,
}: TeamPerformanceProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Top Performers This Month
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topPerformers.map((performer, index) => (
            <div
              key={performer.name}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src={performer.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {performer.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  {index === 0 && (
                    <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-yellow-600 flex items-center justify-center">
                      <span className="text-xs font-bold text-warning-foreground">
                        1
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{performer.name}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {performer.role}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{performer.taskCompleted}</p>
                <p className="text-xs text-muted-foreground">tasks</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Workload Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {workloadData.map((item) => (
            <div key={item.role} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.role}</span>
                <span className="text-muted-foreground">{item.workload}%</span>
              </div>
              <Progress value={item.workload} className="h-2" />
            </div>
          ))}

          <div className="pt-4 border-t border-border">
            <h4 className="font-semibold mb-3">Team Productivity Score</h4>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Progress value={productivity} className="h-3" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-500">
                  {productivity}%
                </p>
                <p className="text-xs text-muted-foreground">Overall</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
