import { Input } from "@/components/atoms/input";
import { ConfirmationModal } from "@/components/organisms/admin/ConfirmationModal";
import DataTable from "@/components/organisms/DataTable";
import { User } from "@/lib/api/auth/auth.types";
import { ButtonConfig } from "@/types/table.types";
import { Search, ToggleLeft, ToggleRight } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface IAdminCustomersProps {
  data: User[];
  isLoading?: boolean;
  updateStatus: (data: User) => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchQuery: string;
}

function AdminCustomers({
  data,
  isLoading,
  updateStatus,
  onPageChange,
  page,
  totalPages,
  searchQuery,
  setSearchQuery,
}: IAdminCustomersProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const headings = ["First Name", "Last Name", "Email", "isActive"];
  const cols: (keyof User)[] = ["firstName", "lastName", "email"];

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
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
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
          if (selectedUser) updateStatus(selectedUser);
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
