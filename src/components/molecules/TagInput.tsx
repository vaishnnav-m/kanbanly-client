import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import { TagInputProps } from "@/types/form.types";
import { Input } from "../atoms/input";

export const TagInput: React.FC<TagInputProps> = ({
  placeholder = "Add tags...",
  className = "",
  onTagsChange,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  // tag adding
  const addTag = (tagText: string): void => {
    const trimmedTag = tagText.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      const newTags = [...tags, trimmedTag];
      setTags(newTags);
      onTagsChange?.(newTags);
    }
    setInputValue("");
  };

  // tag removing
  const removeTag = (indexToRemove: number): void => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    onTagsChange?.(newTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    // Check if comma was typed
    if (value.includes(",")) {
      const newTag = value.replace(",", "");
      addTag(newTag);
      return;
    }

    setInputValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const handleTagRemove = (index: number): void => {
    removeTag(index);
    inputRef.current?.focus();
  };

  return (
    <div
      className={`flex flex-wrap items-center gap-1 min-h-[40px] px-3 py-2 border border-ring rounded-md focus-within:ring-2 ${className}`}
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
              handleTagRemove(index);
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
