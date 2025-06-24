"use client";
import AdminDashboardTemplate from "@/components/templates/admin/AdminDashboardTemplate";
import { useAdminLogout } from "@/lib/hooks/useAuth";
import React from "react";

function page() {
  const { mutate: logout } = useAdminLogout();

  function handleLogout() {
    logout();
  }
  return <AdminDashboardTemplate handleLogout={handleLogout} />;
}

export default page;
