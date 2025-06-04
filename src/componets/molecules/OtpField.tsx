import React, { useState, useRef, useEffect } from "react";

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
  value: string;
  onChange: (value: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length,
  onComplete,
  value,
  onChange,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (value.length === length) {
      onComplete(value);
    }
  }, [value, length, onComplete]);

  const handleChange = (index: number, digit: string) => {
    if (digit.length > 1) return;

    const newValue = value.split("");
    newValue[index] = digit;
    const updatedValue = newValue.join("");

    onChange(updatedValue); // This emits the full OTP string

    // Move to next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    onChange(pastedData);

    // Focus the last filled input or the next empty one
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-14 h-14 text-center text-2xl font-semibold border-2 border-border rounded-lg
                     focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
                     transition-all duration-200 hover:border-primary/50
                     bg-background text-foreground"
        />
      ))}
    </div>
  );
};

export default OTPInput;
