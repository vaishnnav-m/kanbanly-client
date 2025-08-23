import React, {
  // useState,
  useRef,
} from "react";
import { X } from "lucide-react";
import { MultiSelectProps } from "@/types/form.types";
import { cn } from "@/lib/utils";
import { Select } from "../atoms/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

export const MultiSelect: React.FC<MultiSelectProps & { value?: string[] }> = ({
  className = "",
  onTagsChange,
  value = [],
  options,
}) => {
  //   const [selectValue, setSelectedValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const tags = value;

  const addTag = (tagText: string): void => {
    const trimmedTag = tagText.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onTagsChange?.([...tags, trimmedTag]);
    }
    //  setSelectedValue("");
  };

  const removeTag = (indexToRemove: number): void => {
    onTagsChange?.(tags.filter((_, index) => index !== indexToRemove));
  };

  //   const handleInputChange = (val: string): void => {
  //     addTag(val);
  //     setSelectedValue(val);
  //   };

  //   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
  //     if (e.key === "Enter") {
  //       e.preventDefault();
  //       addTag(selectValue);
  //     } else if (e.key === "Backspace" && selectValue === "" && tags.length > 0) {
  //       removeTag(tags.length - 1);
  //     }
  //   };

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
      <Select onValueChange={addTag}>
        <SelectTrigger>
          <SelectValue placeholder="Select any values..." />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
