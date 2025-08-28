"use client";
import AdminLoginTemplate from "@/components/templates/admin/AdminLoginTemplate";
import { LoginPayload } from "@/lib/api/auth/auth.types";
import { useAdminLogin } from "@/lib/hooks/useAuth";
import React from "react";

export default function AdminLoginPage() {
  const { mutate: adminLogin, isPending: isLoading } = useAdminLogin();

  function handleLogin(data: LoginPayload) {
    adminLogin(data);
  }

  return (
    <main>
      <AdminLoginTemplate handleLogin={handleLogin} isLoading={isLoading} />
    </main>
  );
}
