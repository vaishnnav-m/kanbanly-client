"use client";
import { Card } from "@/components/atoms/card";
import { Skeleton } from "@/components/atoms/skeleton";
import React from "react";

function ProjectListSkeleton() {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="p-6 relative animate-pulse">
          <div className="h-1 rounded-b-lg bg-muted absolute top-0 left-0 right-0"></div>

          {/* Project Header Skeleton */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-full flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-muted">
                <Skeleton className="h-6 w-6" />
              </div>
              <div className="w-full flex flex-wrap gap-2 items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-20 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Project Description Skeleton */}
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-3/4 mb-4" />

          {/* Project Footer Skeleton */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-3 w-3" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}

export default ProjectListSkeleton;
