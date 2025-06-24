export type ButtonConfig<T> = {
  action: (data: T) => void;
  icon: (row: T) => React.ReactNode;
  styles: string;
};
