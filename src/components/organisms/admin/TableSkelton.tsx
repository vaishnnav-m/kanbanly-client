import { Card, CardContent, CardHeader } from "@/components/atoms/card";
import { Skeleton } from "@/components/atoms/skeleton";

interface TableSkeletonProps {
  rows?: number;
  title?: string;
}

const TableSkeleton = ({ rows = 5, title }: TableSkeletonProps) => {
  return (
    <Card className="border-0 shadow-md bg-white dark:bg-gray-800">
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: rows }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TableSkeleton;