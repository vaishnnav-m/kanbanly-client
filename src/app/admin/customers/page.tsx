"use client";
import AdminCustomers from "@/components/templates/admin/AdminCustomers";
import { User } from "@/lib/api/auth/auth.types";
import { useGetUsers, useUpdateUserStatus } from "@/lib/hooks/useAdmin";

function page() {
  const { data, isPending } = useGetUsers();
  const { mutate: updateStatus, isPending: isLoading } = useUpdateUserStatus();

  const users = data?.data ?? [];

  const handleUpdateStatus = (user: User) => {
    const id = user.userId;
    updateStatus({ id });
  };

  return (
    <AdminCustomers
      updateStatus={handleUpdateStatus}
      data={users}
      isLoading={isPending}
    />
  );
}

export default page;
