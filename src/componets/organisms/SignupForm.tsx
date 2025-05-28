"use client";
import { FormProps } from "@/types/form";
import React, { useState } from "react";
import FieldGroupRow from "../molecules/FieldGroupRow";
import FormField from "../molecules/FormField";
import { Button } from "../atoms/button";
import { LogIn } from "lucide-react";

const SignupForm = ({
  submitLabel,
  fields,
  onSubmit,
  isLoading,
}: FormProps) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(formValues);
   }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="space-y-3">
        {fields.map((field, index) =>
          "group" in field ? (
            <FieldGroupRow
              key={index}
              fields={field.group}
              values={formValues}
              onChange={handleChange}
            />
          ) : (
            <FormField
              key={index}
              {...field}
              value={formValues[field.id]}
              onChange={handleChange}
            />
          )
        )}
      </div>
      <Button
        type="submit"
        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02]"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Please wait...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <LogIn className="w-5 h-5" />
            <span>{submitLabel}</span>
          </div>
        )}
      </Button>
    </form>
  );
};

export default SignupForm;
