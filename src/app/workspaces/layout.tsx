"use client";
import Header from "@/components/organisms/user/Header";
import Sidebar from "@/components/organisms/user/SideBar";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

function layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  let isLayoutNeeded =
    pathname === "/workspaces" || pathname === "/workspaces/create";
  const [isCollapsed, setIsCollapsed] = useState(true);

  if (isLayoutNeeded) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-300">
      <Header
        setIsSidebarOpen={() => setIsCollapsed((prev) => !prev)}
        isSidebarOpen={isCollapsed}
      />
      <main className="min-h-screen relative flex">
        <Sidebar
          isSidebarOpen={!isCollapsed}
          setIsSidebarOpen={() => setIsCollapsed((prev) => !prev)}
        />
        <div
          className={`px-4 pt-[75px] ${
            !isCollapsed ? "pl-64" : "pl-16"
          } py-6 w-full`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}

export default layout;
