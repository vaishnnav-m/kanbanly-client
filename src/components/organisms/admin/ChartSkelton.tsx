"use client"
import { Card, CardContent, CardHeader } from "@/components/atoms/card";
import { Skeleton } from "@/components/atoms/skeleton";

const ChartSkeleton = () => {
  return (
    <Card className="border-0 shadow-md bg-white dark:bg-gray-800">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full space-y-4">
          {/* Chart area skeleton */}
          <div className="flex items-end justify-between h-64 px-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <Skeleton
                  className="w-8 bg-gradient-to-t from-blue-200 to-transparent"
                  style={{ height: `${Math.random() * 150 + 50}px` }}
                />
                <Skeleton className="h-3 w-8" />
              </div>
            ))}
          </div>
          {/* Legend skeleton */}
          <div className="flex gap-4 justify-center">
            <div className="flex items-center gap-2">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartSkeleton;
