import { workspaceIcons } from "@/constants/icons";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

export const setStorageItem = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export const removeStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const getWorkspaceIcon = (name: string) => {
  return workspaceIcons.find((iconData) => iconData.name === name);
};

export const getDate = (isoString: Date | string) => {
  const date = new Date(isoString);

  const formatted = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return formatted;
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "completed":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "pending":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "low":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "medium":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "high":
      return "bg-rose-500/20 text-rose-400 border-rose-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};
