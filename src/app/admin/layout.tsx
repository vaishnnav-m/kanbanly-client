"use client";
import { AppSidebar } from "@/components/organisms/admin/Sidebar";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex w-full bg-background text-foreground transition-colors duration-300">
      <AppSidebar />
      <main className="pl-64 flex-1">
        <div className="px-4 py-6 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

export default layout;
