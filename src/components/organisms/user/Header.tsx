"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Bell, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { SidebarTrigger, useSidebar } from "@/components/atoms/sidebar";
import { useLogout } from "@/lib/hooks/useAuth";

function Header() {
  const params = useParams();
  const { state } = useSidebar();
  const { mutate: logout } = useLogout();

  function handleLogout() {
    logout();
  }

  return (
    <header
      className={`h-[75px] bg-background fixed right-0 z-50 top-0 py-5 px-10 flex justify-between transition-all duration-300 ease-in-out ${
        state === "collapsed" ? "left-16" : "left-64"
      }`}
    >
      <div className="flex gap-16">
        <SidebarTrigger className="hover:bg-gray-800" />
      </div>
      <div>
        {/* <SearchBar placeholder="Search" /> */}
        {/* <Command className="flex justify-center rounded-lg border shadow-md md:min-w-[450px]">
          <CommandInput placeholder="Search something..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
          </CommandList>
        </Command> */}
      </div>
      <div className="flex gap-5">
        <Link
          className="group"
          href={`/workspaces/${params.slug}/notifications`}
        >
          <Bell className="w-5 h-5 bell-icon" />
        </Link>
        <Link className="group" href={`/workspaces/${params.slug}/manage`}>
          <Settings className="w-5 h-5 transition-transform duration-500 ease-in group-hover:rotate-180" />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="py-0 flex items-start" asChild>
            <User className="w-5 h-5 transition-transform duration-500 ease-in hover:scale-x-[-1] cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-sidebar p-3 mt-2 mr-9 rounded-xl border flex flex-col gap-2 text-sm items-start text-start"
            side="bottom"
            align="start"
          >
            <DropdownMenuItem asChild>
              <Link
                className="flex items-center gap-2 p-2 rounded-sm focus:outline-none focus-visible:border-none"
                href="/user"
              >
                <User className="size-4" /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full flex justify-start hover:bg-transparent !p-2 h-fit focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <LogOut /> Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;
