import { workspaceIcons } from "@/constants/icons";
import { clsx, type ClassValue } from "clsx";
import {
  Briefcase,
  Coffee,
  Heart,
  Music,
  Rocket,
  Settings,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react";
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
