"use client";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import SearchBar from "@/components/molecules/SearchBar";
import { ConfirmationModal } from "@/components/organisms/admin/ConfirmationModal";
import CustomTable from "@/components/organisms/CustomTable";
import { InviteUserModal } from "@/components/organisms/user/InviteUserModal";
import {
  InvitationList,
  WorkspaceInvitationPayload,
  WorkspaceMember,
} from "@/lib/api/workspace/workspace.types";
import { createInvitationColumns } from "@/lib/columns/invitaions.column";
import { createMemberColumns } from "@/lib/columns/member.column";
import { hasPermission, PERMISSIONS, useDebounce } from "@/lib/utils";
import { RootState } from "@/store";
import { workspaceRoles } from "@/types/roles.enum";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// props type
interface IWorkspaceMembersTemplateProps {
  handleInvite: (data: WorkspaceInvitationPayload) => void;
  isLoading: boolean;
  isMembersLoading: boolean;
  members: WorkspaceMember[];
  total: number;
  invitations: InvitationList[];
  isInvitationsLoading: boolean;
  handleRoleChange: (memberId: string, role: workspaceRoles) => void;
  handleStatusUpdate: (memberId: string, isActive: boolean) => void;
  handleRemoveMember: (memberId: string) => void;
  handleChat: (memberId: string) => void;
  handleRemoveInvitation: (memberEmail: string) => void;
  handleResend: (data: WorkspaceInvitationPayload) => void;
}

function WorkspaceMembersTemplates({
  handleInvite,
  isLoading,
  isMembersLoading,
  members,
  total = 0,
  invitations,
  isInvitationsLoading,
  handleRoleChange,
  handleStatusUpdate,
  handleRemoveMember,
  handleChat,
  handleRemoveInvitation,
  handleResend,
}: IWorkspaceMembersTemplateProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  // const [confirmationConfig, setConfirmationConfig] = useState<{
  //   title: "";
  //   description: "";
  // } | null>();
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const { permissions } = useSelector((state: RootState) => state.workspace);
  const [searchValue, setSearchValue] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<
    WorkspaceMember[] | []
  >([]);

  const debouncedSearchValue = useDebounce(searchValue, 300);

  useEffect(() => {
    if (debouncedSearchValue) {
      const normalizedSearch = debouncedSearchValue.trim().toLowerCase();
      const filtered = members.filter((member) =>
        member.email.toLowerCase().includes(normalizedSearch)
      );
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers(members);
    }
  }, [debouncedSearchValue, members]);

  const userRole = useSelector(
    (state: RootState) => state.workspace.memberRole
  );
  const userId = useSelector((state: RootState) => state.auth.userId);

  // table customization
  const handleRemove = (id: string) => {
    setSelectedMemberId(id);
    setIsConfirmModalOpen(true);
  };

  const columns = createMemberColumns(
    handleRoleChange,
    handleStatusUpdate,
    handleRemove,
    handleChat,
    !!permissions?.workspaceMemberAdd,
    userId
  );

  const invitationColumns = createInvitationColumns(
    handleRemoveInvitation,
    handleResend
  );

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-6 md:p-8 h-full">
        <div className="h-full space-y-8">
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

          <div
            className="animate-slide-up space-y-6"
            style={{ animationDelay: "0.2s" }}
          >
            <Card className="p-6 animate-fade-in">
              <div className="w-full flex justify-between items-center px-5 pb-5">
                <div className="flex-1">
                  <span>This workspace has {total} members</span>
                </div>
                <div className="flex-1">
                  <SearchBar
                    placeholder="Search Members"
                    value={searchValue}
                    onChange={(value: string) => setSearchValue(value)}
                  />
                </div>
                <div className="flex-1 text-end">
                  {permissions?.workspaceMemberAdd && (
                    <Button onClick={() => setIsModalOpen(true)}>
                      <UserPlus />
                      Invite Members
                    </Button>
                  )}
                </div>
              </div>
              <div className="px-5">
                <CustomTable<WorkspaceMember>
                  data={filteredMembers}
                  columns={columns}
                  emptyMessage="No Members"
                  isLoading={isMembersLoading}
                  skeletonRows={4}
                  getRowKey={(row) => row._id}
                />
              </div>
            </Card>

            {hasPermission(
              userRole as workspaceRoles,
              PERMISSIONS.VIEW_PENDING_INVITATIONS
            ) && (
              <Card className="p-6 animate-fade-in">
                <div className="w-full flex justify-between items-center px-5 pb-5">
                  <div className="flex-1">
                    <span>Pending invitations {invitations?.length}</span>
                  </div>
                </div>
                <div className="px-5">
                  <CustomTable<InvitationList>
                    data={invitations}
                    columns={invitationColumns}
                    emptyMessage="No Invitations"
                    isLoading={isInvitationsLoading}
                    skeletonRows={4}
                    getRowKey={(row) => row.invitedEmail}
                  />
                </div>
              </Card>
            )}
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
