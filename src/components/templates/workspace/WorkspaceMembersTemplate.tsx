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
import DataTable from "@/components/organisms/DataTable";
import { InviteUserModal } from "@/components/organisms/user/InviteUserModal";
import {
  WorkspaceInvitationPayload,
  WorkspaceMember,
} from "@/lib/api/workspace/workspace.types";
import { RootState } from "@/store";
import { workspaceRoles } from "@/types/roles.enum";
import { ButtonConfig } from "@/types/table.types";
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

  // table customization
  const headings = ["Name", "Email", "Role", "Status", "Manage"];

  const role = useSelector((state: RootState) => state.workspace.memberRole);
  if (role !== "owner") {
    headings.pop();
  }

  const roles = Object.values(workspaceRoles);

  function getRolesTag(member: WorkspaceMember) {
    const isOwner = member.role === "owner";

    if (isOwner) {
      return (
        <Select value={member.role} disabled={true}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="owner">owner</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    }

    return (
      <Select
        onValueChange={(value) =>
          handleRoleChange(member._id, value as workspaceRoles)
        }
        value={member.role}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {roles
              .filter((role) => role !== "owner")
              .map((role) => (
                <SelectItem
                  key={role}
                  value={role}
                  className="focus:bg-slate-500/40"
                >
                  {role}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  const cols: (keyof WorkspaceMember)[] = ["name", "email"];
  const buttonConfigs: ButtonConfig<WorkspaceMember>[] = [
    {
      action: (data) => {},
      styles: "bg-none",
      icon: (member) => getRolesTag(member),
    },
    {
      action: (data) => {
        handleStatusUpdate(data._id, !data.isActive);
      },
      styles: "bg-none",
      icon: (member) =>
        member.role !== "owner" &&
        (member.isActive ? (
          <ToggleRight className="text-green-500" />
        ) : (
          <ToggleLeft className="text-red-500" />
        )),
    },
    {
      action: (data) => {
        setSelectedMemberId(data._id);
        setIsConfirmModalOpen(true);
      },
      styles: "bg-none",
      icon: (member) => member.role !== "owner" && <Trash className="size-4" />,
    },
  ];

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
                <DataTable<WorkspaceMember>
                  headings={headings}
                  data={members}
                  columns={cols}
                  buttonConfigs={role === "owner" ? buttonConfigs : undefined}
                  isLoading={isMembersLoading}
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
