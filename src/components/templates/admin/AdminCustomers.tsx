import { ThemeToggleButton } from "@/components/molecules/ThemeToggleButton";
import TableSkeleton from "@/components/organisms/admin/TableSkelton";
import DataTable from "@/components/organisms/DataTable";
import { User } from "@/lib/api/auth/auth.types";
import { ButtonConfig } from "@/types/table.types";
import { ToggleLeft, ToggleRight } from "lucide-react";

interface IAdminCustomersProps {
  data: User[];
  isLoading?: boolean;
  updateStatus: (data: User) => void;
}

function AdminCustomers({
  data,
  isLoading,
  updateStatus,
}: IAdminCustomersProps) {
  const headings = ["Id", "First Name", "Last Name", "Email", "isActive"];

  const cols: (keyof User)[] = ["_id", "firstName", "lastName", "email"];

  const buttonConfigs: ButtonConfig<User>[] = [
    {
      action: updateStatus,
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
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <DataTable<User>
            headings={headings}
            data={data}
            columns={cols}
            buttonConfigs={buttonConfigs}
          />
        )}
      </div>
    </>
  );
}

export default AdminCustomers;
