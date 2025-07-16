"use client";
import AdminCustomers from "@/components/templates/admin/AdminCustomers";
import { User } from "@/lib/api/auth/auth.types";
import { useGetUsers, useUpdateUserStatus } from "@/lib/hooks/useAdmin";
import { useState } from "react";

function page() {
  const [page, setPage] = useState(1);
  const { data, isPending } = useGetUsers(page);
  const { mutate: updateStatus, isPending: isLoading } = useUpdateUserStatus();

  const users = data?.data?.users ?? [];
  const totalPages = data?.data?.totalPages ?? 0;

  const handleUpdateStatus = (user: User) => {
    const id = user.userId;
    updateStatus({ id });
  };

  const onPageChange = (page: number) => {
    setPage(page);
  };

  return (
    <AdminCustomers
      updateStatus={handleUpdateStatus}
      data={users}
      isLoading={isPending}
      page={page}
      onPageChange={onPageChange}
      totalPages={totalPages}
    />
  );
}

export default page;
