"use client";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import SearchBar from "@/components/molecules/SearchBar";
import { ConfirmationModal } from "@/components/organisms/admin/ConfirmationModal";
import CustomTable from "@/components/organisms/CustomTable";
import DataTable from "@/components/organisms/DataTable";
import { InviteUserModal } from "@/components/organisms/user/InviteUserModal";
import {
  WorkspaceInvitationPayload,
  WorkspaceMember,
} from "@/lib/api/workspace/workspace.types";
import { createMemberColumns } from "@/lib/columns/member.column";
import { RootState } from "@/store";
import { workspaceRoles } from "@/types/roles.enum";
import { ButtonConfig, TableColumn } from "@/types/table.types";
import {
  EllipsisIcon,
  ToggleLeft,
  ToggleRight,
  Trash,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

// props type
interface IWorkspaceMembersTemplateProps {
  handleInvite: (data: WorkspaceInvitationPayload) => void;
  isLoading: boolean;
  isMembersLoading: boolean;
  members: WorkspaceMember[];
  total: number;
  handleRoleChange: (memberId: string, role: workspaceRoles) => void;
  handleStatusUpdate: (memberId: string, isActive: boolean) => void;
  handleRemoveMember: (memberId: string) => void;
}

function WorkspaceMembersTemplates({
  handleInvite,
  isLoading,
  isMembersLoading,
  members,
  total = 0,
  handleRoleChange,
  handleStatusUpdate,
  handleRemoveMember,
}: IWorkspaceMembersTemplateProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const role = useSelector((state: RootState) => state.workspace.memberRole);

  // table customization
  const handleRemove = (id: string) => {
    setSelectedMemberId(id);
    setIsConfirmModalOpen(true);
  };

  const columns = createMemberColumns(
    handleRoleChange,
    handleStatusUpdate,
    handleRemove
  );

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-6 md:p-8 h-full">
        <div className="max-w-7xl mx-auto h-full space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1 animate-fade-in">
              Members
            </h1>
            <p
              className="text-muted-foreground animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Manage your team members, see who’s active, and stay up to date
              with recent activity.
            </p>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Card className="p-6 animate-fade-in">
              <div className="w-full flex justify-between items-center px-5 pb-5">
                <div className="flex-1">
                  <span>This workspace has {total} members</span>
                </div>
                {/* <div className="flex-1">
                  <SearchBar placeholder="Search Members" />
                </div> */}
                <div className="flex-1 text-end">
                  {role === "owner" && (
                    <Button onClick={() => setIsModalOpen(true)}>
                      <UserPlus />
                      Invite Members
                    </Button>
                  )}
                </div>
              </div>
              <div className="px-5">
                <CustomTable<WorkspaceMember>
                  data={members}
                  columns={columns}
                  emptyMessage="No Members"
                  isLoading={isMembersLoading}
                  skeletonRows={4}
                />
              </div>
            </Card>
            <InviteUserModal
              isLoading={isLoading}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onInvite={handleInvite}
            />
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => {
          handleRemoveMember(selectedMemberId);
          setIsConfirmModalOpen(false);
        }}
        title="Remove Member?"
        description="This action will permanently remove the member from the workspace. Are you sure you want to proceed?"
        cancelText="Cancel"
        confirmText="Delete"
      />
    </main>
  );
}

export default WorkspaceMembersTemplates;
