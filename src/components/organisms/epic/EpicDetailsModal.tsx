"use client";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import { Resizable } from "re-resizable";
import React, { useState } from "react";
import { ConfirmationModal } from "../admin/ConfirmationModal";
import { IEpic } from "@/lib/api/epic/epic.types";
import { RootState } from "@/store";
import { workspaceRoles } from "@/types/roles.enum";
import { useSelector } from "react-redux";
import { EpicHeader } from "@/components/molecules/epic/EpicHeader";
import { EpicInfo } from "@/components/molecules/epic/EpicInfo";

interface EpicDetailsModalProps {
  epic?: IEpic;
  isVisible: boolean;
  close: () => void;
}

export const EpicDetailsModal = ({
  epic,
  isVisible,
  close,
}: EpicDetailsModalProps) => {
  const [width, setWidth] = useState(448);
  // modal states
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  // editing states
  const [editingName, setEditingName] = useState<string | null>(null);
  const [editingDescription, setEditingDescription] = useState<string | null>(
    null
  );
  const [editingDueDate, setEditingDueDate] = useState<string | null>(null);

  // get user role from redux
  const role = useSelector(
    (state: RootState) => state.workspace.memberRole
  ) as workspaceRoles;
  if (!isVisible || !epic) return null;

  if (!epic) return null;
  return (
    <div className="fixed top-4 right-4 h-[calc(100vh-2rem)] z-50">
      <Resizable
        defaultSize={{ width }}
        size={{ width: width, height: "100%" }}
        onResizeStop={(e, direction, ref, d) => {
          setWidth(width + d.width);
        }}
        maxWidth={800}
        minWidth={448}
        enable={{ left: true }}
      >
        <Card className="relative h-full flex flex-col shadow-xl border-border bg-card">
          {/* Header */}
          <EpicHeader
            memberRole={role as workspaceRoles}
            name={epic.title}
            status={epic.status}
            setIsConfirmationOpen={setIsConfirmationOpen}
            setEditingName={setEditingName}
            editingName={editingName}
            close={close}
          />

          {/* Content */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Task Info */}
            <EpicInfo
              epicId={epic.epicId}
              dueDate={undefined}
              description={epic.description}
              memberRole={role}
              editingDueDate={editingDueDate}
              setEditingDueDate={setEditingDueDate}
              editingDescription={editingDescription}
              setEditingDescription={setEditingDescription}
            />
            {(editingDescription !== null ||
              editingDueDate !== null ||
              editingName !== null) && (
              <div className="w-full flex">
                <Button onClick={() => {}} className="w-full">
                  Save Changes
                </Button>
                <Button
                  onClick={() => {
                    setEditingDescription(null);
                    setEditingDueDate(null);
                    setEditingName(null);
                  }}
                  variant="outline"
                  className="w-full hover:bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>

          <ConfirmationModal
            isOpen={isConfirmationOpen}
            onClose={() => setIsConfirmationOpen(false)}
            onConfirm={() => {}}
            title="Are you sure you want to remove this epic?"
            description="This action cannot be undone. The epic will be permanently deleted from the project."
            cancelText="Cancel"
            confirmText="Delete Epic"
          />
        </Card>
      </Resizable>
    </div>
  );
};
