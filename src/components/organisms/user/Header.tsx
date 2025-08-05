"use client";
import SearchBar from "@/components/molecules/SearchBar";
import { Bell, Settings, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

function Header({
  setIsSidebarOpen,
  isSidebarOpen,
}: {
  setIsSidebarOpen: () => void;
  isSidebarOpen: boolean;
}) {
  const params = useParams();
  return (
    <header className="w-full h-[75px] bg-background fixed z-50 top-0 py-5 px-10 flex justify-between">
      <div className="flex gap-16">
        <Link href="/workspaces" className="font-bold text-2xl">
          Kanbanly
        </Link>
        {isSidebarOpen && (
          <img
            className="cursor-pointer"
            src="/collapse.svg"
            onClick={setIsSidebarOpen}
          />
        )}
      </div>
      <div>
        <SearchBar placeholder="Search" />
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
        <Link className="group" href="/user">
          <User className="w-5 h-5 transition-transform duration-500 ease-in group-hover:scale-x-[-1]" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
