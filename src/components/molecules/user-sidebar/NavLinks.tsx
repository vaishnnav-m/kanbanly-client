"use client";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/atoms/sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  links: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}

function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {links.map((item) => {
            const isActive =
              pathname === item.url || pathname.endsWith(item.url);
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton className={`${isActive && "bg-gray-500/15"}`} asChild>
                  <Link href={item.url}>
                    <item.icon className="mr-3 size-5 transition-transform duration-200 group-hover:scale-110" />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export default NavLinks;
