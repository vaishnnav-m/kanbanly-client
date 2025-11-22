import { Skeleton } from "@/components/atoms/skeleton";
import React from "react";

export const UserManagementSkelton = () => {
  return (
    <main className="flex-1 p-8">
      <div className="max-w-4xl space-y-6 mx-auto">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex gap-5">
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-10 w-36" />
          </div>
        </div>

        {/* Card Skeleton */}
        <div className="border border-workspace-border rounded-xl bg-blue-200/5">
          <div className="p-8">
            <div className="flex items-start gap-8">
              {/* Icon Section */}
              <div className="flex flex-col items-center space-y-4">
                <Skeleton className="w-32 h-32 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Details Section */}
              <div className="flex-1 space-y-6">
                <Skeleton className="h-6 w-48" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-16 w-full" />
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-workspace-border">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* security skeleton */}
        <div className="border border-workspace-border rounded-xl bg-blue-200/5 p-8 space-y-6">
          <Skeleton className="h-6 w-48" />
          <div className="w-full flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-48" />
            </div>

            <Skeleton className="h-9 w-36" />
          </div>
        </div>

        {/* preference skeleton */}
        <div className="border border-workspace-border rounded-xl bg-blue-200/5 p-8 space-y-6">
          <Skeleton className="h-6 w-48" />
          <div className="w-full flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-48" />
            </div>

            <Skeleton className="h-9 w-36" />
          </div>
        </div>
      </div>
    </main>
  );
};
