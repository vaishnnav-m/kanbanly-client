import React from "react";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import { SingleField } from "@/types/form";

interface FieldGroupRowProps {
  fields: SingleField[];
  values: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FieldGroupRow: React.FC<FieldGroupRowProps> = ({
  fields,
  values,
  onChange,
}) => {
  return (
    <div className="flex space-x-2">
      {fields.map((field) => (
        <div key={field.id} className="flex-1">
          <Label htmlFor={field.id} className="text-sm font-medium">
            {field.label}
          </Label>
          <Input
            onChange={onChange}
            value={values[field.id] || ""}
            {...field}
            name={field.id}
          />
        </div>
      ))}
    </div>
  );
};

export default FieldGroupRow;
