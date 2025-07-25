"use client";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  MessageSquare,
  Users,
  Plus,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/atoms/button";
import { CreateProjectModal } from "../project/CreateProject";
import { useState } from "react";
import { ProjectCreationPayload } from "@/lib/api/project/project.types";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function SideBar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const pathname = usePathname();
  const params = useParams();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
 

  const navigation = [
    { name: "Home", href: `/workspaces/${params.slug}`, icon: Home },
    {
      name: "Chats",
      href: `/workspaces/${params.slug}/chats`,
      icon: MessageSquare,
    },
    {
      name: "Members",
      href: `/workspaces/${params.slug}/members`,
      icon: Users,
    },
  ];

  const projects = [
    { name: "CRM Platform", href: "/projects/crm", active: true },
  ];

  const isActive = (href: string) => pathname === href;
  return (
    <div
      className={`${
        isSidebarOpen ? "w-16" : "w-64"
      } fixed top-[75px] bottom-0 transition-all duration-300 animate-slide-up flex flex-col
      bg-white text-zinc-800 border-r border-zinc-200 
      dark:bg-background dark:text-zinc-100 dark:border-zinc-800`}
    >
      {/* Navigation */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {!isSidebarOpen && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 px-2">
            Navigation
          </p>
        )}

        {navigation.map((item) => (
          <Link key={item.name} href={item.href} passHref>
            <div
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer ${
                isActive(item.href)
                  ? "bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-800 dark:bg-[#1a1a21] dark:text-zinc-100"
                  : "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              }`}
            >
              <item.icon
                className={`${
                  isSidebarOpen ? "mx-auto" : "mr-3"
                } h-5 w-5 transition-transform duration-200 group-hover:scale-110`}
              />
              {!isSidebarOpen && (
                <span className="animate-fade-in">{item.name}</span>
              )}
            </div>
          </Link>
        ))}

        <div className="my-4 w-full h-[1px] bg-zinc-200 dark:bg-zinc-800" />

        {/* Projects Section */}
        <div className="space-y-1">
          {!isSidebarOpen && (
            <div className="flex items-center justify-between px-2 py-1 animate-fade-in">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Projects
              </span>
              <Button
                onClick={() => setIsProjectModalOpen(true)}
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
                    isSidebarOpen ? "mx-auto" : "mr-3"
                  } h-3 w-3 rounded-full bg-blue-500 transition-transform duration-200 group-hover:scale-110`}
                />
                {!isSidebarOpen && (
                  <span className="animate-fade-in">{project.name}</span>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="my-4 w-full h-[1px] bg-zinc-200 dark:bg-zinc-800" />

        {/* Team Section */}
        <div className="space-y-1">
          {!isSidebarOpen && (
            <div className="px-2 py-1 animate-fade-in">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Team
              </span>
            </div>
          )}

          <div className="group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100">
            <div
              className={`${
                isSidebarOpen ? "mx-auto" : "mr-3"
              } h-5 w-5 rounded-full p-4 bg-blue-100 dark:bg-blue-900 flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}
            >
              <span className="text-xs text-blue-600 dark:text-blue-400">
                MW
              </span>
            </div>
            {!isSidebarOpen && (
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
          <Settings
            className={`${isSidebarOpen ? "mx-auto" : "mr-2"} h-4 w-4`}
          />
          {!isSidebarOpen && <span className="animate-fade-in">Settings</span>}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
        >
          <HelpCircle
            className={`${isSidebarOpen ? "mx-auto" : "mr-2"} h-4 w-4`}
          />
          {!isSidebarOpen && <span className="animate-fade-in">Help docs</span>}
        </Button>

        {!isSidebarOpen && (
          <div className="pt-2 text-xs text-zinc-400 dark:text-zinc-500 border-t border-zinc-200 dark:border-zinc-700">
            © 2025 Kanbanly
          </div>
        )}
      </div>
      <CreateProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </div>
  );
}
