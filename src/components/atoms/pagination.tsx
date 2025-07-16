"use client";
import React from "react";
import { Button } from "./button";

interface PaginationProps {
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

export const Pagination = ({
  onPageChange,
  page,
  totalPages,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </Button>
      <span className="text-sm px-2">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </div>
  );
};
