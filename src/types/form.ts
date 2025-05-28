export interface FormFieldProps {
  id: string;
  className?: string;
  label: string;
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
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
  required?: boolean;
};

export type GroupField = {
  group: SingleField[];
};

export type FieldConfig = SingleField | GroupField;

export interface FormProps {
  submitLabel: string;
  fields: FieldConfig[];
  onSubmit: (values: Record<string, string>) => void;
  isLoading: boolean;
  error?: string;
}
