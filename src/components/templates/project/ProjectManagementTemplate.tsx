"use client";
import { useState, useRef } from "react";
import { Edit3, Save, X, Trash, Users, Plus } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ConfirmationModal } from "@/components/organisms/admin/ConfirmationModal";
import {
  IProject,
  ProjectEditingPayload,
} from "@/lib/api/project/project.types";
import { getDate } from "@/lib/utils";
import { workspaceRoles } from "@/types/roles.enum";
import DataTable from "@/components/organisms/DataTable";
import { WorkspaceMember } from "@/lib/api/workspace/workspace.types";
import { ButtonConfig } from "@/types/table.types";
import { InviteUserDropdown } from "@/components/molecules/InviteUserDropdown";

interface ProjectManagementTemplateProps {
  projectData: Omit<IProject, "workspaceId" | "slug" | "createdBy">;
  handleDelete: () => void;
  uploadEdited: (data: ProjectEditingPayload) => void;
  handleMemberAdding: (data: { email: string }) => void;
  isMemberAdding: boolean;
  isDeleting: boolean;
  isEditLoading: boolean;
  members?: WorkspaceMember[];
  isProjectMembersFetching: boolean;
  handleMemberRemoving: (userId: string) => void;
  isMemberRemoving: boolean;
}

export function ProjectManagementTemplate({
  projectData,
  handleDelete,
  uploadEdited,
  isDeleting,
  isEditLoading,
  handleMemberAdding,
  isMemberAdding,
  members,
  isProjectMembersFetching,
  handleMemberRemoving,
}: // isMemberRemoving,
ProjectManagementTemplateProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<ProjectEditingPayload | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // member removal
  const [modalType, setModalType] = useState<"project" | "member" | null>(null);
  const [selectedMember, setSelectedMember] = useState("");

  const role = useSelector((state: RootState) => state.workspace.memberRole);

  const handleSave = () => {
    if (!editData) {
      return;
    }
    uploadEdited(editData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const havePermission =
    role === workspaceRoles.owner || role === workspaceRoles.projectManager;

  // Wrapper function to handle the dropdown invitation format
  const handleDropdownInvite = (data: {
    invitedEmail?: string;
    email?: string;
    role?: string;
  }) => {
    if (data.email) {
      handleMemberAdding({ email: data.email });
    }
  };

  // members table
  const headings = ["Name", "Email", "Role"];
  if (role === workspaceRoles.owner || role === workspaceRoles.projectManager) {
    headings.push("Action");
  }

  const cols: (keyof WorkspaceMember)[] = ["name", "role", "email"];
  const buttonConfigs: ButtonConfig<WorkspaceMember>[] = [
    {
      action: (data) => {
        setModalType("member");
        setSelectedMember(data._id);
      },
      styles: "bg-none",
      icon: (member) =>
        havePermission &&
        member.role !== "owner" && <Trash className="text-red-500 size-4" />,
    },
  ];

  // for confirmation modal
  const modalContentMap = {
    project: {
      title: "Delete Project?",
      description:
        "This action will permanently delete the project and all associated tasks. This cannot be undone. Are you sure you want to proceed?",
    },
    member: {
      title: "Remove Member?",
      description: `Are you sure you want to remove this member from the project? This action cannot be undone.`,
    },
  };

  return (
    <main className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-workspace-text-primary mb-2">
              Project Details
            </h1>
            <p className="text-muted-foreground">
              Manage your project information and settings
            </p>
          </div>

          {!isEditing && havePermission && (
            <div className="flex gap-5">
              <Button
                disabled={isDeleting}
                onClick={() => setModalType("project")}
                className="bg-red-500/80 hover:bg-red-500"
              >
                <Trash className="w-4 h-4 mr-2" />
                {isDeleting ? "Removing..." : "Remove Project"}
              </Button>
              <Button
                onClick={handleEdit}
                className="bg-primary hover:bg-primary/90"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Details
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Project Card */}
          <Card className="bg-blue-200/5 border-workspace-border">
            <CardContent className="p-8">
              <div className="flex items-start gap-8 ">
                {/* Details Section */}
                <div className="flex-1 space-y-6">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-workspace-text-primary">
                          Project Name
                        </label>
                        <Input
                          value={
                            editData?.name ? editData.name : projectData.name
                          }
                          onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                          }
                          className="bg-background border-workspace-border text-workspace-text-primary"
                          placeholder="Enter workspace name"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-workspace-text-primary">
                          Description
                        </label>
                        <Textarea
                          value={
                            editData?.description
                              ? editData.description
                              : projectData.description
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              description: e.target.value,
                            })
                          }
                          className="bg-background border-workspace-border text-workspace-text-primary min-h-24"
                          placeholder="Describe your workspace"
                        />
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <Button
                          onClick={handleSave}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {isEditLoading ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button
                          onClick={handleCancel}
                          variant="outline"
                          className="border-workspace-border text-workspace-text-primary hover:bg-primary/10"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-workspace-text-primary">
                          {projectData.name}
                        </h2>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                          Description
                        </h3>
                        <p className="text-workspace-text-primary leading-relaxed">
                          {projectData.description}
                        </p>
                      </div>

                      {/* Additional Info */}
                      <div className="grid grid-cols-2 gap-6 pt-6 border-t border-workspace-border">
                        {projectData.createdAt && (
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                              Created
                            </h3>
                            <p className="text-workspace-text-primary">
                              {getDate(projectData.createdAt)}
                            </p>
                          </div>
                        )}
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                            Members
                          </h3>
                          <div className="flex gap-5 items-center">
                            <Users className="size-5" />
                            {projectData.members.length || 0}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Members Card */}
          <Card className="bg-blue-200/5 border-workspace-border">
            <CardContent className="p-8">
              {havePermission && (
                <div className="w-full text-end pb-5">
                  <Button
                    ref={buttonRef}
                    onClick={() => setIsDropdownOpen(true)}
                  >
                    <Plus />
                    Add User
                  </Button>
                </div>
              )}
              <div className="flex items-start gap-8">
                <DataTable
                  headings={headings}
                  columns={cols}
                  data={members}
                  isLoading={isProjectMembersFetching}
                  buttonConfigs={
                    !isEditing && havePermission ? buttonConfigs : undefined
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <InviteUserDropdown
        isOpen={isDropdownOpen}
        isLoading={isMemberAdding}
        onClose={() => setIsDropdownOpen(false)}
        onInvite={handleDropdownInvite}
        buttonRef={buttonRef}
      />
      <ConfirmationModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        onConfirm={() => {
          if (modalType === "project") {
            handleDelete();
          } else {
            handleMemberRemoving(selectedMember);
            setSelectedMember("");
          }
          setModalType(null);
        }}
        title={modalType ? modalContentMap[modalType].title : ""}
        description={modalType ? modalContentMap[modalType!].description : ""}
        cancelText="Cancel"
        confirmText="Remove"
      />
    </main>
  );
}
