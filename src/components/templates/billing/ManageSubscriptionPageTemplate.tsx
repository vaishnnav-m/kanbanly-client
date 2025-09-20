"use client";
import Logo from "@/components/atoms/logo";
import NavUser from "@/components/molecules/NavUser";
import { ThemeToggleButton } from "@/components/molecules/ThemeToggleButton";
import { useLogout } from "@/lib/hooks/useAuth";
import Link from "next/link";

function ManageSubscriptionPageTemplate() {
  const { mutate: logout } = useLogout();

  function handleLogout() {
    logout();
  }

  return (
    <>
      <header className="w-full h-16 px-6 shadow-lg flex items-center justify-between">
        <Link href="/workspaces">
          <Logo />
        </Link>
        <div className="flex gap-3 items-center">
          <ThemeToggleButton />
          <NavUser handleLogout={handleLogout} />
        </div>
      </header>
      <main></main>
    </>
  );
}

export default ManageSubscriptionPageTemplate;
