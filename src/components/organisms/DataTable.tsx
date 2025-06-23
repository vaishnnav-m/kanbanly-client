import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../atoms/table";
import { ToggleLeft, ToggleRight } from "lucide-react";

interface TableProps<T extends object> {
  headings: string[];
  data?: T[];
  columns?: (keyof T)[];
}

const DataTable = <T extends object>({
  headings,
  data,
  columns,
}: TableProps<T>) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headings.map((heading, idx) => (
            <TableHead key={idx}>{heading}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((row, idx) => (
          <TableRow key={idx}>
            {columns?.map((col, idx) => (
              <TableCell key={idx}>
                {typeof row[col] === "boolean" ? (
                  row[col] ? (
                    <ToggleRight className="fill-green-500" />
                  ) : (
                    <ToggleLeft />
                  )
                ) : (
                  (row[col] as React.ReactNode) || "Nill"
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
