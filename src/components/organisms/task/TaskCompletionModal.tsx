"use client";

import React, { useState, useEffect, useRef } from "react";
import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Upload } from "lucide-react";

interface TaskCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (file: File | null) => void;
  isUploading?: boolean;
}

export const TaskCompletionModal = ({
  isOpen,
  onClose,
  onConfirm,
  isUploading = false,
}: TaskCompletionModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setFile(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Complete Task"
      text="Would you like to provide an attachment before completing this task?"
      footer={
        <div className="flex justify-end gap-3 px-4 py-2 mt-4 w-full">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isUploading}
            className="mr-auto"
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              onConfirm(null);
            }}
            disabled={isUploading}
          >
            Skip & Complete
          </Button>
          <Button
            onClick={() => onConfirm(file)}
            disabled={!file || isUploading}
          >
            {isUploading ? "Uploading..." : "Upload & Complete"}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4 py-4 px-2">
        <div className="space-y-2">
          <Label htmlFor="attachment" className="text-sm font-medium">
            Attachment
          </Label>
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              id="attachment"
              type="file"
              onChange={handleFileChange}
              className="cursor-pointer"
              disabled={isUploading}
            />
          </div>
          {file && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <Upload className="w-3 h-3" />
              {file.name}
            </p>
          )}
        </div>
      </div>
    </BaseModal>
  );
};