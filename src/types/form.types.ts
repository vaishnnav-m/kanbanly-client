export interface FormFieldProps {
  id: string;
  label?: string;
  placeholder?: string;
  type?: string;
  value: string;
  otpLength?: number;
  errors?: Record<string, string>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onTagsChange?: (tags: string[]) => void;
  tagsField?: boolean;
  onLink?: () => void;
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
  tagsField?: boolean;
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
}

export interface TagInputProps {
  placeholder?: string;
  className?: string;
  value?: string[];
  onTagsChange?: (tags: string[]) => void;
}

export interface MultiSelectProps {
  options: { title: string; value: string }[];
  className?: string;
  value?: string[];
  onTagsChange?: (tags: string[]) => void;
}
