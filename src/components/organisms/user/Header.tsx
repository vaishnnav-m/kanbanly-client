"use client";
import SearchBar from "@/components/molecules/SearchBar";
import { Bell, Search, Settings, User } from "lucide-react";

function Header({ setIsSidebarOpen }: { setIsSidebarOpen: () => void }) {
  return (
    <header className="w-full h-[75px] bg-background fixed top-0 py-5 px-10 flex justify-between">
      <div className="flex gap-16">
        <h1 className="font-bold text-2xl">Kanbanly</h1>
        <img src="/collapse.svg" onClick={setIsSidebarOpen} />
      </div>
      <div>
        <SearchBar placeholder="Search" />
      </div>
      <div className="flex gap-5">
        <Bell className="w-5 h-5" />
        <Settings className="w-5 h-5" />
        <User className="w-5 h-5" />
      </div>
    </header>
  );
}

export default Header;
