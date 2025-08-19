"use client";
import AdminDashboardTemplate from "@/components/templates/admin/AdminDashboardTemplate";
import { useAdminLogout } from "@/lib/hooks/useAuth";
import React from "react";

export default function AdminDashboardPage() {
  const { mutate: logout } = useAdminLogout();

  function handleLogout() {
    logout();
  }
  return <AdminDashboardTemplate handleLogout={handleLogout} />;
}
