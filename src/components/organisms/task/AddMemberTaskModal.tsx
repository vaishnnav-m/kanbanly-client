"use client";
import { BaseModal } from "@/components/molecules/BaseModal";
import { useState } from "react";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (taskId: string, data: { assignedTo: string }) => void;
  isLoading: boolean;
  taskId: string;
}

export const AddMemberModal = ({
  isOpen,
  onClose,
  onInvite,
  isLoading,
  taskId,
}: AddMemberModalProps) => {
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleInvite = () => {
    onInvite(taskId, { assignedTo: email });
    setEmail("");
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign task to teammates"
      text="Add teammates to share responsibilities and achieve more together."
      footer={
        <div className="flex justify-center space-x-2">
          <button
            className="px-10 py-2 bg-gray-200 dark:bg-transparent dark:border rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-10 py-2 bg-primary text-white rounded cursor-pointer hover:bg-purple-400"
            onClick={handleInvite}
            disabled={!email.trim()}
          >
            {isLoading ? "Assigning..." : "Assign"}
          </button>
        </div>
      }
    >
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="email"
          placeholder="E-mail address"
          value={email}
          onChange={handleChange}
          className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-inherit text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
        />
      </div>
    </BaseModal>
  );
};
