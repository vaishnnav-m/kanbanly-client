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
import { Button } from "../atoms/button";
import { ButtonConfig } from "@/types/table.types";

interface TableProps<T extends object> {
  headings: string[];
  data?: T[];
  columns?: (keyof T)[];
  buttonConfigs: ButtonConfig<T>[];
}

const DataTable = <T extends object>({
  headings,
  data,
  columns,
  buttonConfigs,
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
                {(row[col] as React.ReactNode) || "Nill"}
              </TableCell>
            ))}
            {buttonConfigs.map((button) => (
              <TableCell>
                <button onClick={() => button.action(row)} className={button.styles}>{button.icon(row)}</button>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
