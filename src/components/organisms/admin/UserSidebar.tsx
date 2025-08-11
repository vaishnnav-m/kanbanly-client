"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/atoms/sidebar";
import {
  Calendar,
  Home,
  Inbox,
  MessageSquare,
  Search,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

function UserSidebar() {
  const params = useParams();

  const navigation = [
    { title: "Home", url: `/workspaces/${params.slug}`, icon: Home },
    {
      title: "Chats",
      url: `/workspaces/${params.slug}/chats`,
      icon: MessageSquare,
    },
    {
      title: "Members",
      url: `/workspaces/${params.slug}/members`,
      icon: Users,
    },
  ];

  return (
    <Sidebar>
      <div className="px-3 py-4 ">
        <SidebarHeader>
          <Link href="/workspaces" className="font-bold text-2xl">
            <div className="w-full pb-5 flex items-center gap-3">
              <img className="size-6" src="/logo.svg" />
              Kanbanly
            </div>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="mr-3 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}

export default UserSidebar;
