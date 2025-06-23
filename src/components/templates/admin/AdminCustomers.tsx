import { ThemeToggleButton } from "@/components/molecules/ThemeToggleButton";
import TableSkeleton from "@/components/organisms/admin/TableSkelton";
import CustomTable from "@/components/organisms/DataTable";
import { User } from "@/lib/api/auth/auth.types";

interface IAdminCustomersProps {
  data: User[];
  isLoading?: boolean;
}

function AdminCustomers({ data, isLoading }: IAdminCustomersProps) {
  const headings = ["Id", "First Name", "Last Name", "Email", "isActive"];

  const cols: (keyof User)[] = [
    "_id",
    "firstName",
    "lastName",
    "email",
    "isActive",
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
          <CustomTable headings={headings} data={data} columns={cols} />
        )}
      </div>
    </>
  );
}

export default AdminCustomers;
