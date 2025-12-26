"use client";
import { ThemeToggleButton } from "@/components/molecules/ThemeToggleButton";
import { AppSidebar } from "@/components/organisms/admin/Sidebar";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useAdminLogout } from "@/lib/hooks/useAuth";

function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const { mutate: logout } = useAdminLogout();

  function handleLogout() {
    logout();
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex w-full bg-background text-foreground transition-colors duration-300">
      <AppSidebar />
      <main className="pl-64 flex-1">
        <div className="w-full flex justify-end p-5">
          <div className="flex items-center gap-5">
            <ThemeToggleButton />
            {/* Logout Button */}
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer dark:text-white transition-all duration-300`}
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
        <div className="px-4 py-6 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

export default AdminLayout;
