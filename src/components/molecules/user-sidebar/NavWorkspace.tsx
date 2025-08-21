import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/atoms/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Building2, ChevronRight, FolderPlus, UserPlus } from "lucide-react";
import React, { useState } from "react";

function NavWorkspace() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Team</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu onOpenChange={setIsOpen}>
              <DropdownMenuTrigger className="" asChild>
                <SidebarMenuButton className="flex justify-between items-center">
                  <span className="flex items-center gap-3">
                    <Building2 className="size-5" />
                    My Workspace
                  </span>{" "}
                  <ChevronRight
                    className={`transition-transform duration-200 ${
                      isOpen && "rotate-90"
                    }`}
                  />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-sidebar p-3 rounded-xl border"
                side="right"
                align="start"
              >
                <DropdownMenuItem asChild>
                  <SidebarMenuButton className="!ring-0">
                    <FolderPlus />
                    Create Project
                  </SidebarMenuButton>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <SidebarMenuButton className="!ring-0">
                    <UserPlus />
                    Add Members
                  </SidebarMenuButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export default NavWorkspace;
