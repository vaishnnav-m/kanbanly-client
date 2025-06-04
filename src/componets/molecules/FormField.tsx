import React, { useState } from "react";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import { Eye, EyeOff } from "lucide-react";
import OTPInput from "./OtpField";

interface FormFieldProps {
  id: string;
  label?: string;
  placeholder?: string;
  type?: string;
  value: string;
  otpLength?: number;
  errors?: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  otpLength = 6,
  errors,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const isOtpField = type === "otp";

  return (
    <div className="space-y-2">
      {/* label component rendering */}
      {label && (
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
      )}

      {/* otp field rendering */}
      {isOtpField ? (
        <OTPInput
          length={otpLength}
          value={value || ""}
          onChange={(otpValue) => {
            const syntheticEvent = {
              target: {
                name: id,

                value: otpValue,
              },
            } as React.ChangeEvent<HTMLInputElement>;

            onChange(syntheticEvent);
          }}
          onComplete={() => {}}
        />
      ) : (
        // normal field rendering
        <div className="relative">
          <Input
            id={id}
            name={id}
            type={isPasswordField && showPassword ? "text" : type}
            value={value || ""}
            onChange={onChange}
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
      )}
      {errors && <p className="text-red-500">{errors[id]}</p>}
    </div>
  );
};
export default FormField;
