"use client";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import SearchBar from "@/components/molecules/SearchBar";
import DataTable from "@/components/organisms/DataTable";
import { InviteUserModal } from "@/components/organisms/user/InviteUserModal";
import {
  WorkspaceInvitationPayload,
  WorkspaceMember,
} from "@/lib/api/workspace/workspace.types";
import { RootState } from "@/store";
import { ButtonConfig } from "@/types/table.types";
import { EllipsisIcon, UserPlus } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

// props type
interface IWorkspaceMembersTemplateProps {
  handleInvite: (data: WorkspaceInvitationPayload) => void;
  isLoading: boolean;
  isMembersLoading: boolean;
  members: WorkspaceMember[];
  total: number;
}

function WorkspaceMembersTemplates({
  handleInvite,
  isLoading,
  isMembersLoading,
  members,
  total = 0,
}: IWorkspaceMembersTemplateProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // table customization
  const headings = ["Name", "Role", "Last Activity", "Manage"];

  const role = useSelector((state: RootState) => state.workspace.memberRole);
  if (role === "member") {
    headings.pop();
  }

  const cols: (keyof WorkspaceMember)[] = ["name", "role", "email"];
  const buttonConfigs: ButtonConfig<WorkspaceMember>[] = [
    {
      action: (data) => {
        console.log("button clicked", data);
      },
      styles: "bg-none",
      icon: (member) => <EllipsisIcon />,
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
                <div className="flex-1">
                  <SearchBar placeholder="Search Members" />
                </div>
                <div className="flex-1 text-end">
                  <Button onClick={() => setIsModalOpen(true)}>
                    <UserPlus />
                    Invite Members
                  </Button>
                </div>
              </div>
              <div className="px-5">
                <DataTable<WorkspaceMember>
                  headings={headings}
                  data={members}
                  columns={cols}
                  buttonConfigs={role !== "member" ? buttonConfigs : undefined}
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
    </main>
  );
}

export default WorkspaceMembersTemplates;
