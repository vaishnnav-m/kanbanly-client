"use client";
import { BaseModal } from "@/components/molecules/BaseModal";
import { WorkspaceInvitationPayload } from "@/lib/api/workspace/workspace.types";
import { workspaceRoles } from "@/types/roles.enum";
import { useParams } from "next/navigation";
import React, { useState } from "react";

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (data: WorkspaceInvitationPayload) => void;
  isLoading: boolean;
}

export const InviteUserModal = ({
  isOpen,
  onClose,
  onInvite,
  isLoading,
}: InviteUserModalProps) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(workspaceRoles.member);
  const params = useParams();

  const roles = Object.values(workspaceRoles);

  const handleInvite = () => {
    onInvite({ invitedEmail: email, role });
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

        <div className="relative flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-inherit overflow-hidden flex-1 min-w-[120px] transition-colors duration-300">
          <span className="absolute left-3 text-gray-500 dark:text-gray-400 transition-colors duration-300">
            &#128100;
          </span>{" "}
          {/* Person icon */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as workspaceRoles)}
            className="pl-10 pr-3 py-3 w-full appearance-none bg-transparent text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg cursor-pointer transition-colors duration-300"
          >
            {/* <option
              value=""
              className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              Role
            </option> */}
            {roles &&
              roles.map((rol) => (
                <option
                  key={rol}
                  value={rol}
                  className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                >
                  {rol}
                </option>
              ))}
          </select>
          {/* Custom arrow for select */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
{/* 
      <div className="flex justify-center">
        <span className="text-md underline text-gray-300">
          or get an invite link to share
        </span>
      </div> */}
    </BaseModal>
  );
};
