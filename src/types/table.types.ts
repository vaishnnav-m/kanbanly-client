import React from "react";

export type ButtonConfig<T> = {
  action: (data: T) => void;
  icon: (row: T) => React.ReactNode;
  styles: string;
};

export interface BaseRowData {
  _id?: string;
  id?: string;
  [key: string]: any;
}

// Base column
export interface BaseColumn<T extends BaseRowData> {
  key: keyof T | string;
  label: string;
  headerClassName?: string;
  cellClassName?: string;
}

// button variants
export type ButtonVariants =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

// text column
export interface TextColumn<T extends BaseRowData = BaseRowData>
  extends BaseColumn<T> {
  type: "text";
}

// button column
export interface ButtonColumn<T extends BaseRowData = BaseRowData>
  extends BaseColumn<T> {
  type: "button";
  variant?: ButtonVariants;
  buttonLabel?: string;
  onClick?: (row: T) => void;
  disabled?: (row: T) => boolean;
  tootip?: (row: T) => string;
  icon?: (row: T) => React.ReactNode;
}

// select column
export interface SelectColumn<T extends BaseRowData = BaseRowData>
  extends BaseColumn<T> {
  type: "select";
  options: { value: string | number; label: string }[];
  onChange?: (row: T, value: number | string) => void;
  disabled?: (row: T) => boolean;
}

// custom column
export interface CustomColumn<T extends BaseRowData = BaseRowData>
  extends BaseColumn<T> {
  type: "custom";
  render: (row: T, value: any) => React.ReactNode;
}

// Table column
export type TableColumn<T extends BaseRowData = BaseRowData> =
  | TextColumn<T>
  | ButtonColumn<T>
  | SelectColumn<T>
  | CustomColumn<T>;

// Table Props
export interface CustomTableProps<T extends BaseRowData> {
  data: T[];
  columns: TableColumn<T>[];
  isLoading?: boolean;
  skeletonRows?: number;
  emptyMessage?: string;
  className?: string;
  onRowClick?: (row: T) => void;
  getRowKey?: (row: T, idx: number) => string | number;
}
