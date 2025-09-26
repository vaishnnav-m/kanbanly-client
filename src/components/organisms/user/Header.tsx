"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Bell, Settings } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/atoms/sidebar";
import { useLogout } from "@/lib/hooks/useAuth";
import NavUser from "@/components/molecules/NavUser";

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
        <NavUser handleLogout={handleLogout} />
      </div>
    </header>
  );
}

export default Header;
