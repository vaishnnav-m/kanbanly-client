"use client";
import {
  BaseRowData,
  CustomTableProps,
  TableColumn,
} from "@/types/table.types";
import { Button } from "../atoms/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../atoms/table";
import { Skeleton } from "../atoms/skeleton";

function CustomTable<T extends BaseRowData>({
  data,
  columns,
  onRowClick,
  className = "",
  emptyMessage,
  getRowKey = (row, idx) => row.id || row._id || idx,
  isLoading,
  skeletonRows,
}: CustomTableProps<T>) {
  // function to render the cell content
  function renderCellContent(row: T, column: TableColumn<T>) {
    const value = row[column.key];
    switch (column.type) {
      case "text":
        return (
          <span className={column.cellClassName}>{value ? value : "-"}</span>
        );
      case "button":
        return (
          <Button
            className={column.cellClassName}
            variant={column.variant}
            onClick={() => column.onClick?.(row)}
            title={column.tootip?.(row)}
            disabled={column.disabled?.(row)}
          >
            {column.icon?.(row)}
            {column.buttonLabel}
          </Button>
        );
      case "select":
        return (
          <Select
            onValueChange={(value) => {
              column.onChange?.(row, value);
            }}
            value={String(value)}
            disabled={column.disabled?.(row)}
          >
            <SelectTrigger className={column.cellClassName || ""}>
              <SelectValue placeholder="select any role" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {column.options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={String(option.value)}
                    className="focus:bg-slate-500/40"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      case "custom":
        return column.render?.(row, value);
    }
  }

  const handleRowClick = (row: T) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  if (isLoading) {
    return (
      <Table className={className}>
        <TableHeader>
          <TableRow>
            {columns.map((col, idx) => (
              <TableHead key={idx} className={col.headerClassName}>
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: skeletonRows || 0 }).map((_, rowIdx) => (
            <TableRow key={`skeleton-${rowIdx}`}>
              {columns.map((col, colIdx) => (
                <TableCell key={`skeleton-${rowIdx}-${colIdx}`}>
                  <Skeleton className="h-5 w-32" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (!data || !data.length) {
    return (
      <Table className={className}>
        <TableHeader>
          <TableRow>
            {columns.map((col, idx) => (
              <TableHead key={idx} className={col.headerClassName}>
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              className="text-center dark:text-gray-500"
              colSpan={columns.length}
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          {columns.map((col, idx) => (
            <TableHead key={idx} className={col.headerClassName}>
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIdx) => (
          <TableRow
            key={getRowKey(row, rowIdx)}
            className={onRowClick ? "cursor-pointer" : ""}
            onClick={() => handleRowClick}
          >
            {columns.map((col, colIdx) => (
              <TableCell key={colIdx}>{renderCellContent(row, col)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CustomTable;
