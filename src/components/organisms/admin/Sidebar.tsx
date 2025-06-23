"use client";
import { Button } from "@/components/atoms/button";
import {
  BarChart3,
  ChevronLeft,
  Home,
  FileText,
  Users,
  Map,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } fixed h-screen flex flex-col transition-all duration-200 md:flex
        bg-white text-zinc-800 border-r border-zinc-200 
        dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          {!collapsed && <h2 className="text-lg font-bold">Kanbanly</h2>}
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setCollapsed((prev) => !prev)}
          className={`h-8 w-8 transition-transform ${
            collapsed ? "rotate-180" : ""
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-2">
        <div className="mb-4">
          {!collapsed && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 px-2">
              Navigation
            </p>
          )}
          <ul className="space-y-1">
            <li>
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 px-2 py-2 rounded-md transition-colors
                    hover:bg-zinc-100 hover:text-zinc-900
                    dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                <Home className="h-4 w-4" />
                {!collapsed && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/customers"
                className="flex items-center gap-2 px-2 py-2 rounded-md transition-colors
                    hover:bg-zinc-100 hover:text-zinc-900
                    dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                <Users className="h-4 w-4" />
                {!collapsed && <span>Customers</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashbord"
                className="flex items-center gap-2 px-2 py-2 rounded-md transition-colors
                    hover:bg-zinc-100 hover:text-zinc-900
                    dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                <Map className="h-4 w-4" />
                {!collapsed && <span>Plans</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashbord"
                className="flex items-center gap-2 px-2 py-2 rounded-md transition-colors
                    hover:bg-zinc-100 hover:text-zinc-900
                    dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                <FileText className="h-4 w-4" />
                {!collapsed && <span>Reports</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {!collapsed && (
        <div className="p-4 text-xs text-zinc-400 dark:text-zinc-500 border-t border-zinc-200 dark:border-zinc-700">
          © 2024 Dashboard Pro
        </div>
      )}
    </aside>
  );
}
