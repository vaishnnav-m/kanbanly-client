import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../atoms/table";
import { ButtonConfig } from "@/types/table.types";

interface TableProps<T extends { _id: string | number }> {
  headings: string[];
  data?: T[];
  columns?: (keyof T)[];
  buttonConfigs?: ButtonConfig<T>[];
  isLoading?: boolean;
  skeletonRows?: number;
}

const DataTable = <T extends { _id: string | number }>({
  headings,
  data,
  columns,
  buttonConfigs,
  isLoading = false,
  skeletonRows = 5,
}: TableProps<T>) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headings.map((heading, idx) => (
            <TableHead key={heading + idx}>{heading}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: skeletonRows }).map((_, rowIdx) => (
              <TableRow key={`skeleton-${rowIdx}`}>
                {headings.map((_, colIdx) => (
                  <TableCell key={`skeleton-${rowIdx}-${colIdx}`}>
                    <div className="h-4 w-full bg-muted rounded animate-pulse" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : data?.map((row, rowIdx) => (
              <TableRow key={rowIdx}>
                {columns?.map((col) => (
                  <TableCell
                    className={`${row[col] ? "" : "pl-10"}`}
                    key={`col-${String(col)}`}
                  >
                    {(row[col] as React.ReactNode) || "—"}
                  </TableCell>
                ))}
                {buttonConfigs?.map((button, idx) => (
                  <TableCell key={`btn-${row._id}-${idx}`}>
                    <button
                      onClick={() => button.action(row)}
                      className={button.styles}
                    >
                      {button.icon(row)}
                    </button>
                  </TableCell>
                ))}
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
