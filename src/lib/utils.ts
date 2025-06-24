import { clsx, type ClassValue } from "clsx";
import { Briefcase, Coffee, Heart, Music, Rocket, Settings, Star, Target, Users, Zap } from "lucide-react";
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

export const getWorkspaceIcon = (name:string) => {
  const workspaceIcons = [
    { icon: Briefcase, name: "briefcase", color: "bg-blue-500" },
    { icon: Users, name: "users", color: "bg-green-500" },
    { icon: Settings, name: "settings", color: "bg-gray-500" },
    { icon: Heart, name: "heart", color: "bg-red-500" },
    { icon: Star, name: "star", color: "bg-yellow-500" },
    { icon: Zap, name: "zap", color: "bg-purple-500" },
    { icon: Target, name: "target", color: "bg-orange-500" },
    { icon: Rocket, name: "rocket", color: "bg-indigo-500" },
    { icon: Coffee, name: "coffee", color: "bg-amber-600" },
    { icon: Music, name: "music", color: "bg-pink-500" },
  ];

   return workspaceIcons.find((iconData) => iconData.name === name); 
}