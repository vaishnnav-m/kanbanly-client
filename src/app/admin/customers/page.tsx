"use client";
import AdminCustomers from "@/components/templates/admin/AdminCustomers";
import { User } from "@/lib/api/auth/auth.types";
import { useGetUsers, useUpdateUserStatus } from "@/lib/hooks/useAdmin";
import { useDebounce } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function AdminCustomersPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filters = {
    search: debouncedSearchQuery,
  };

  const { data, isPending } = useGetUsers(page, filters);
  const { mutate: updateStatus } = useUpdateUserStatus();

  const [users, setUsers] = useState<User[]>([]);

  const totalPages = data?.data?.totalPages ?? 0;

  useEffect(() => {
    setUsers(data?.data?.users ?? []);
  }, [data?.data?.users]);

  const handleUpdateStatus = (user: User) => {
    const id = user.userId;
    updateStatus({ id });

    user.isActive = !user.isActive;
    const filteredUsers = users.filter((user) => user.userId !== id);
    filteredUsers.push(user);

    setUsers(filteredUsers);
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
      setSearchQuery={setSearchQuery}
      searchQuery={searchQuery}
    />
  );
}
