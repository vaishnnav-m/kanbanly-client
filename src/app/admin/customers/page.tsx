"use client";
import AdminCustomers from "@/components/templates/admin/AdminCustomers";
import { User } from "@/lib/api/auth/auth.types";
import { useGetUsers } from "@/lib/hooks/useAdmin";
import { useEffect, useState } from "react";

function page() {
  const [users, setUsers] = useState<User[]>([]);
  const { mutate: getUsers, isPending } = useGetUsers({
    onSuccess: (response) => {
      console.log(response);
      if (response.data) {
        setUsers(response.data);
      }
    },
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    const response = getUsers();
    console.log(response);
  }

  return <AdminCustomers data={users} isLoading={isPending} />;
}

export default page;
