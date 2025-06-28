"use client";
import Header from "@/components/organisms/user/Header";
import Sidebar from "@/components/organisms/user/SideBar";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

function layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  let isLayoutNotNeeded =
    pathname === "/workspaces" || pathname === "/workspaces/create";

  if (isLayoutNotNeeded) {
    return <>{children}</>;
  }

  const [isSidebarOpen, setIsSidbarOpen] = useState(true);

  return (
    <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-300">
      <Header />
      <main className="flex">
        <Sidebar />
        <div className="px-4 pt-[75px] pl-64 py-6 w-full">{children}</div>
      </main>
    </div>
  );
}

export default layout;
