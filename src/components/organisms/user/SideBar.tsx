"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  Home,
  MessageSquare,
  Users,
  Plus,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/atoms/button";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Chats", href: "/chats", icon: MessageSquare },
  { name: "Members", href: "/members", icon: Users },
];

const projects = [
  { name: "CRM Platform", href: "/projects/crm", active: true },
];

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } fixed h-screen transition-all duration-300 animate-slide-up flex flex-col
      bg-white text-zinc-800 border-r border-zinc-200 
      dark:bg-background dark:text-zinc-100 dark:border-zinc-800`}
    >
      {/* Navigation */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {!isCollapsed && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 px-2">
            Navigation
          </p>
        )}

        {navigation.map((item) => (
          <Link key={item.name} href={item.href} passHref>
            <div
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer ${
                isActive(item.href)
                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                  : "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              }`}
            >
              <item.icon
                className={`${
                  isCollapsed ? "mx-auto" : "mr-3"
                } h-5 w-5 transition-transform duration-200 group-hover:scale-110`}
              />
              {!isCollapsed && (
                <span className="animate-fade-in">{item.name}</span>
              )}
            </div>
          </Link>
        ))}

        <div className="my-4 w-full h-[1px] bg-zinc-200 dark:bg-zinc-800" />

        {/* Projects Section */}
        <div className="space-y-1">
          {!isCollapsed && (
            <div className="flex items-center justify-between px-2 py-1 animate-fade-in">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Projects
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="h-5 w-5 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          )}

          {projects.map((project) => (
            <Link key={project.name} href={project.href}>
              <div
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer ${
                  isActive(project.href)
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                    : "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                }`}
              >
                <div
                  className={`${
                    isCollapsed ? "mx-auto" : "mr-3"
                  } h-3 w-3 rounded-full bg-blue-500 transition-transform duration-200 group-hover:scale-110`}
                />
                {!isCollapsed && (
                  <span className="animate-fade-in">{project.name}</span>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="my-4 w-full h-[1px] bg-zinc-200 dark:bg-zinc-800" />

        {/* Team Section */}
        <div className="space-y-1">
          {!isCollapsed && (
            <div className="px-2 py-1 animate-fade-in">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Team
              </span>
            </div>
          )}

          <div className="group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100">
            <div
              className={`${
                isCollapsed ? "mx-auto" : "mr-3"
              } h-5 w-5 rounded-full p-4 bg-blue-100 dark:bg-blue-900 flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}
            >
              <span className="text-xs text-blue-600 dark:text-blue-400">
                MW
              </span>
            </div>
            {!isCollapsed && (
              <span className="animate-fade-in">My Workspace</span>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
        >
          <Settings className={`${isCollapsed ? "mx-auto" : "mr-2"} h-4 w-4`} />
          {!isCollapsed && <span className="animate-fade-in">Settings</span>}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
        >
          <HelpCircle
            className={`${isCollapsed ? "mx-auto" : "mr-2"} h-4 w-4`}
          />
          {!isCollapsed && <span className="animate-fade-in">Help docs</span>}
        </Button>

        {!isCollapsed && (
          <div className="pt-2 text-xs text-zinc-400 dark:text-zinc-500 border-t border-zinc-200 dark:border-zinc-700">
            © 2024 Kanbanly
          </div>
        )}
      </div>
    </div>
  );
}
