"use client";
import { Input } from "@/components/atoms/input";
import { ConfirmationModal } from "@/components/organisms/admin/ConfirmationModal";
import CustomTable from "@/components/organisms/CustomTable";
import { Pagination } from "@/components/atoms/pagination";
import { IWorkspace } from "@/lib/api/workspace/workspace.types";
import { createWorkspacesColumns } from "@/lib/columns/workspaces.column";
import { Search } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IAdminWorkspacesTemplate {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  onRemove: (workspaceId: string) => void;
  workspaces: IWorkspace[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}

export const AdminWorkspacesTemplate = ({
  workspaces,
  searchQuery,
  setSearchQuery,
  onRemove,
  page,
  setPage,
  totalPages,
}: IAdminWorkspacesTemplate) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState("");

  useEffect(() => {
    setPage(1);
  }, [searchQuery, setPage]);

  const handleRemove = (workspaceId: string) => {
    setSelectedWorkspaceId(workspaceId);
    setIsConfirmModalOpen(true);
  };

  const columns = createWorkspacesColumns(handleRemove);

  return (
    <>
      <div className="w-full flex justify-between py-5">
        <h1 className="text-xl font-bold">Workspaces</h1>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      <div className="space-y-8 animate-fade-in">
        <CustomTable
          columns={columns}
          data={workspaces}
          emptyMessage="No Workspaces"
          getRowKey={(row) => row.workspaceId}
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
      <ConfirmationModal
        title="Delete Workspace?"
        description="This action will permanently delete the workspace and all associated projects, tasks, and members. This cannot be undone. Are you sure you want to proceed?"
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => {
          onRemove(selectedWorkspaceId);
          setIsConfirmModalOpen(false);
          setSelectedWorkspaceId("");
        }}
      />
    </>
  );
};
