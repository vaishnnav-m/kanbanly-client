import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import { TagInputProps } from "@/types/form.types";
import { cn } from "@/lib/utils";

export const TagInput: React.FC<TagInputProps & { value?: string[] }> = ({
  placeholder = "Add tags...",
  className = "",
  onTagsChange,
  value = [], // default empty array
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const tags = value; // controlled from parent

  const addTag = (tagText: string): void => {
    const trimmedTag = tagText.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onTagsChange?.([...tags, trimmedTag]);
    }
    setInputValue("");
  };

  const removeTag = (indexToRemove: number): void => {
    onTagsChange?.(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    if (val.includes(",")) {
      addTag(val.replace(",", ""));
      return;
    }
    setInputValue(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1 min-h-[40px] px-3 py-2 border border-ring rounded-md focus-within:ring-2",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeTag(index);
            }}
            className="inline-flex items-center justify-center w-4 h-4 text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full transition-colors"
          >
            <X size={12} />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] outline-none bg-transparent text-sm px-3 py-2"
      />
    </div>
  );
};
