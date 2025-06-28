"use client";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { Progress } from "@/components/atoms/progress";

const goals = [
  { id: 1, title: "Goal - 1", progress: 75, color: "bg-blue-500" },
  { id: 2, title: "Goal - 2", progress: 45, color: "bg-green-500" },
];

export function Goals() {
  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Goals</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
          >
            My Goals
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs hover:bg-muted transition-colors duration-200"
          >
            Team Goals
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {goals.map((goal, index) => (
          <div
            key={goal.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{goal.title}</span>
              <span className="text-xs text-muted-foreground">
                {goal.progress}%
              </span>
            </div>
            <Progress
              value={goal.progress}
              className="h-2 transition-all duration-500 hover:h-3"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
