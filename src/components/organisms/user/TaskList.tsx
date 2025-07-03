"use client";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { Check, Circle } from "lucide-react";
const tasks = [
  {
    id: 1,
    title: "My task",
    completed: false,
    project: "CRM Platform",
    date: "May 12, 2025",
  },
  {
    id: 2,
    title: "My task",
    completed: false,
    project: "CRM Platform",
    date: "May 12, 2025",
  },
];

export function TaskList() {
  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">My Tasks</h2>
      </div>

      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 group animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-5 w-5 rounded-full hover:bg-primary/10 transition-colors duration-200"
            >
              {task.completed ? (
                <Check className="h-4 w-4 text-primary" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              )}
            </Button>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {task.title}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="px-2 py-1 bg-accent/10 text-accent rounded-full">
                {task.project}
              </div>
              <span>{task.date}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
