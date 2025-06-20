import { z } from "zod";

export interface FormFieldProps {
  id: string;
  className?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  value: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FieldGroupRowProps {
  inputs: FormFieldProps[];
}

export type SingleField = {
  id: string;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  required?: boolean;
  otpLength?: number;
  onLink?: () => void;
};

export type GroupField = {
  group: SingleField[];
};

export type FieldConfig = SingleField | GroupField;

export interface FormProps<T extends object> {
  submitLabel: string;
  fields: FieldConfig[];
  onSubmit: (values: T) => void;
  isLoading: boolean;
  errors?: Record<string, string>;
  // schema: z.ZodSchema<T>;
}
