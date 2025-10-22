"use client";
import { Badge } from "@/components/atoms/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/tooltip";
import { TaskPriority } from "@/types/task.enum";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bug,
  CheckSquare,
  FileText,
  GitBranch,
  Star,
} from "lucide-react";

// work item type map
export const workItemTypeMap = {
  task: {
    icon: <CheckSquare className="size-4 text-blue-400" />,
    label: "Task",
  },
  bug: { icon: <Bug className="size-4 text-red-400" />, label: "Bug" },
  story: {
    icon: <FileText className="w-4 h-4 text-green-500" />,
    label: "Story",
  },
  epic: { icon: <Star className="size-4 text-purple-400" />, label: "Epic" },
  subtask: {
    icon: <GitBranch className="size-4 text-teal-400" />,
    label: "Subtask",
  },
};

// component to get the icon based on work item type
export const WorkItemTypeIcon = ({
  type,
  className,
}: {
  type: string;
  className?: string;
}) => {
  const typeInfo = workItemTypeMap[type as keyof typeof workItemTypeMap];
  if (!typeInfo) return null;

  return (
    <Tooltip>
      <TooltipTrigger>
        <span className={className}>{typeInfo.icon}</span>
      </TooltipTrigger>
      <TooltipContent side="bottom">{typeInfo.label}</TooltipContent>
    </Tooltip>
  );
};

// component to get the priority badge
export const PriorityBadge = ({ priority }: { priority: string }) => {
  const priorityMap = {
    [TaskPriority.high]: {
      icon: <ArrowUp className="h-4 w-4 mr-1" />,
      color:
        "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20",
    },
    [TaskPriority.medium]: {
      icon: <ArrowRight className="h-4 w-4 mr-1" />,
      color:
        "bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/20",
    },
    [TaskPriority.low]: {
      icon: <ArrowDown className="h-4 w-4 mr-1" />,
      color:
        "bg-rose-500/20 text-rose-400 border-rose-500/30 hover:bg-rose-500/20",
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
