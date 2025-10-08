"use client"
import { Bug, CheckSquare, FileText, Star } from "lucide-react";

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
