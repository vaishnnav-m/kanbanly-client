"use client";
import AdminDashboardTemplate from "@/components/templates/admin/AdminDashboardTemplate";
import { useGetAnalytics } from "@/lib/hooks/useAdmin";
import React from "react";

export default function AdminDashboardPage() {
  const { data: analytics } = useGetAnalytics();

  if (!analytics?.data) {
    return;
  }

  return <AdminDashboardTemplate analytics={analytics.data} />;
}
