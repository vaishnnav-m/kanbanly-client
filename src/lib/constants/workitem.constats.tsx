"use client";
import { Badge } from "@/components/atoms/badge";
import { TaskPriority } from "@/types/task.enum";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bug,
  CheckSquare,
  FileText,
  Star,
} from "lucide-react";

export const workItemTypeMap = {
  task: {
    icon: <CheckSquare className="size-4 text-blue-400" />,
    label: "Task",
  },
  bug: { icon: <Bug className="size-4 text-red-400" />, label: "Bug" },
  feature: {
    icon: <Star className="size-4 text-yellow-400" />,
    label: "Feature",
  },
  story: {
    icon: <FileText className="w-4 h-4 text-green-500" />,
    label: "Story",
  },
};

export const PriorityBadge = ({ priority }: { priority: string }) => {
  const priorityMap = {
    [TaskPriority.high]: {
      icon: <ArrowUp className="h-4 w-4 mr-1" />,
      color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20",
    },
    [TaskPriority.medium]: {
      icon: <ArrowRight className="h-4 w-4 mr-1" />,
      color: "bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/20",
    },
    [TaskPriority.low]: {
      icon: <ArrowDown className="h-4 w-4 mr-1" />,
      color: "bg-rose-500/20 text-rose-400 border-rose-500/30 hover:bg-rose-500/20",
    },
  };
  const { icon, color } = priorityMap[priority as keyof typeof priorityMap];
  return (
    <Badge className={`flex items-center w-fit ${color}`}>
      {icon}
      {priority}
    </Badge>
  );
};
