import React, { useState } from "react";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import { Eye, EyeOff } from "lucide-react";

interface FormFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField = ({ id, label, type, value, ...props }: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          name={id}
          type={isPasswordField && showPassword ? "text" : type}
          value={value || ""}
          {...props}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormField;
