import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../atoms/dropdown-menu";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../atoms/button";

function NavUser({ handleLogout }: { handleLogout: () => void }) {
  return (
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
  );
}

export default NavUser;
