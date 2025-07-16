import { ThemeToggleButton } from "@/components/molecules/ThemeToggleButton";
import { ConfirmationModal } from "@/components/organisms/admin/ConfirmationModal";
import TableSkeleton from "@/components/organisms/admin/TableSkelton";
import DataTable from "@/components/organisms/DataTable";
import { User } from "@/lib/api/auth/auth.types";
import { ButtonConfig } from "@/types/table.types";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";

interface IAdminCustomersProps {
  data: User[];
  isLoading?: boolean;
  updateStatus: (data: User) => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function AdminCustomers({
  data,
  isLoading,
  updateStatus,
  onPageChange,
  page,
  totalPages,
}: IAdminCustomersProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const headings = ["Id", "First Name", "Last Name", "Email", "isActive"];
  const cols: (keyof User)[] = ["userId", "firstName", "lastName", "email"];

  const buttonConfigs: ButtonConfig<User>[] = [
    {
      action: (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
      },
      styles: "bg-none",
      icon: (user) =>
        user.isActive ? (
          <ToggleRight className="fill-green-500" />
        ) : (
          <ToggleLeft />
        ),
    },
  ];

  return (
    <>
      {/* Header with Theme Toggle */}
      <div className="w-full flex justify-between py-5">
        <h1 className="text-xl font-bold">Customers</h1>
        <ThemeToggleButton />
      </div>

      {/* Dashboard Content */}
      <div className="space-y-8 animate-fade-in">
        <DataTable<User>
          headings={headings}
          data={data}
          columns={cols}
          buttonConfigs={buttonConfigs}
          isLoading={isLoading}
          onPageChange={onPageChange}
          page={page}
          totalPages={totalPages}
        />
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          selectedUser && updateStatus(selectedUser);
          setIsModalOpen(false);
        }}
        title={`${selectedUser?.isActive ? "Block" : "Unblock"} User`}
        description={`Are you sure to ${
          selectedUser?.isActive ? "block" : "unblock"
        } the user`}
        confirmText="Proceed"
        cancelText="Cancel"
        isDestructive={false}
      />
    </>
  );
}

export default AdminCustomers;
