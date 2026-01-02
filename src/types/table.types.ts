export type ButtonConfig<T> = {
  action: (data: T) => void;
  icon: (row: T) => React.ReactNode;
  styles: string;
};

// Base column
export interface BaseColumn {
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
export interface TextColumn<T> extends BaseColumn {
  key: keyof T;
  type: "text";
}

// button column
export interface ButtonColumn<T> extends BaseColumn {
  type: "button";
  variant?: ButtonVariants;
  buttonLabel?: string;
  onClick?: (row: T) => void;
  disabled?: (row: T) => boolean;
  tootip?: (row: T) => string;
  icon?: (row: T) => React.ReactNode;
}

// select column
export interface SelectColumn<T> extends BaseColumn {
  key: keyof T;
  type: "select";
  options: { value: string | number; label: string }[];
  onChange?: (row: T, value: number | string) => void;
  disabled?: (row: T) => boolean;
}

// action column
export interface ActionColumn<T> extends BaseColumn {
  type: "action";
  render: (row: T) => React.ReactNode;
}

// custom column
export type CustomColumn<T> = {
  [K in keyof T]: BaseColumn & {
    type: "custom";
    key: K;
    render: (row: T, value: T[K]) => React.ReactNode;
  };
}[keyof T];

// Table column
export type TableColumn<T> =
  | TextColumn<T>
  | ButtonColumn<T>
  | SelectColumn<T>
  | CustomColumn<T>
  | ActionColumn<T>;

// Table Props
export interface CustomTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  isLoading?: boolean;
  skeletonRows?: number;
  emptyMessage?: string;
  className?: string;
  onRowClick?: (row: T) => void;
  getRowKey: (row: T, idx: number) => string | number;
}
