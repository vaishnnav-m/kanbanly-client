import { AppSidebar } from "@/components/organisms/admin/Sidebar";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
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
