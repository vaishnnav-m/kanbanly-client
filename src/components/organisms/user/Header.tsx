"use client";
import { Bell, Search, Settings, User } from "lucide-react";

function Header() {
  return (
    <header className="w-full h-[75px] bg-background fixed top-0 py-5 px-10 flex justify-between">
      <div className="flex gap-16">
        <h1 className="font-bold text-2xl">Kanbanly</h1>
        <img src="/collapse.svg"/>
      </div>
      <div>
        <div className="w-[340px] h-[40px] pl-3 flex items-center border rounded-xl overflow-hidden transition focus-within:ring-2 focus-within:ring-primary">
          <Search className="w-5 h-5 border-[#8f929c]" />
          <input
            className="px-3 w-full bg-inherit border-none h-full focus:outline-none focus:ring-0 text-lg"
            placeholder="Search"
            id="search"
          />
        </div>
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
