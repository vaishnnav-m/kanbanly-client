"use client";
import { Card } from "@/components/atoms/card";
import { BaseModal } from "@/components/molecules/BaseModal";
import { useParams } from "next/navigation";
import React, { useState } from "react";

interface InviteUserProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (data: { email: string }) => void;
  isLoading: boolean;
}

export const InviteUserProjectModal = ({
  isOpen,
  onClose,
  onInvite,
  isLoading,
}: InviteUserProjectModalProps) => {
  const [email, setEmail] = useState("");
  const params = useParams();

  const handleInvite = () => {
    onInvite({ email });
    setEmail("");
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Invite people to ${params.slug}`}
      text="Add teammates to manage leads and grow together."
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
            {isLoading ? "Inviting" : "Invite"}
          </button>
        </div>
      }
    >
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="email"
          placeholder="E-mail address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-inherit text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
        />
      </div>
      <Card></Card>
    </BaseModal>
  );
};
