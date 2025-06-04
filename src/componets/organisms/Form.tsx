"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { FormProps } from "@/types/form.types";
import FieldGroupRow from "../molecules/FieldGroupRow";
import FormField from "../molecules/FormField";
import { Button } from "../atoms/button";

const Form = <T extends object>({
  submitLabel,
  fields,
  onSubmit,
  isLoading,
  errors,
}: FormProps<T>) => {
  const [formValues, setFormValues] = useState<T & Record<string, string>>(
    {} as T & Record<string, string>
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(formValues);
  }

  return (
    <motion.form
      key="animated-form"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="space-y-10"
    >
      <div className="space-y-3">
        {fields.map((field, index) =>
          "group" in field ? (
            <FieldGroupRow
              key={index}
              fields={field.group}
              values={formValues}
              onChange={handleChange}
              errors={errors}
            />
          ) : (
            <FormField
              key={index}
              {...field}
              value={formValues[field.id]}
              onChange={handleChange}
              errors={errors}
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
    </motion.form>
  );
};

export default Form;
