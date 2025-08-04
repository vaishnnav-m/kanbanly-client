"use client";
import { useState } from "react";
import { Edit3, Save, X, Trash } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import { workspaceIcons } from "@/constants/icons";
import { IWorkspace } from "@/lib/api/workspace/workspace.types";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface WorkspaceManageTemplateProps {
  workspaceData: Omit<IWorkspace, "workspaceId" | "slug" | "createdBy">;
}

export function WorkspaceManageTemplate({
  workspaceData,
}: WorkspaceManageTemplateProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(workspaceData);

  const role = useSelector((state: RootState) => state.workspace.memberRole);

  const handleSave = () => {};

  const handleEdit = () => {
    setEditData(workspaceData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditData(workspaceData);
    setIsEditing(false);
  };

  const handleIconChange = (iconName: string) => {
    setEditData({ ...editData, logo: iconName });
  };

  const getCurrentIcon = () => {
    const currentIconName = isEditing ? editData.logo : workspaceData.logo;
    return (
      workspaceIcons.find((item) => item.name === currentIconName) ||
      workspaceIcons[0]
    );
  };

  const getDate = (isoString: Date) => {
    const date = new Date(isoString);

    const formatted = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return formatted;
  };

  return (
    <main className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-workspace-text-primary mb-2">
              Workspace Details
            </h1>
            <p className="text-muted-foreground">
              Manage your workspace information and settings
            </p>
          </div>

          {!isEditing && role === "owner" && (
            <div className="flex gap-5">
              <Button
                onClick={handleEdit}
                className="bg-red-500/80 hover:bg-red-500"
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete Workspace
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

        {/* Workspace Card */}
        <Card className="bg-blue-200/5 border-workspace-border">
          <CardContent className="p-8">
            <div className="flex items-start gap-8">
              {/* Icon Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div
                    className={`w-32 h-32 rounded-full flex items-center justify-center ${
                      getCurrentIcon().color
                    }`}
                  >
                    {(() => {
                      const IconComponent = getCurrentIcon().icon;
                      return <IconComponent className="w-16 h-16 text-white" />;
                    })()}
                  </div>
                </div>

                {isEditing && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-workspace-text-primary text-center">
                      Choose Icon
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {workspaceIcons.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <button
                            key={item.name}
                            onClick={() => handleIconChange(item.name)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                              item.color
                            } ${
                              editData.logo === item.name
                                ? "ring-2 ring-primary"
                                : ""
                            }`}
                          >
                            <IconComponent className="w-5 h-5 text-white" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {!isEditing && (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Workspace Icon
                    </p>
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div className="flex-1 space-y-6">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-workspace-text-primary">
                        Workspace Name
                      </label>
                      <Input
                        value={editData.name}
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
                        value={editData.description}
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
                        Save Changes
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
                        {workspaceData.name}
                      </h2>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        Description
                      </h3>
                      <p className="text-workspace-text-primary leading-relaxed">
                        {workspaceData.description}
                      </p>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-2 gap-6 pt-6 border-t border-workspace-border">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                          Created
                        </h3>
                        <p className="text-workspace-text-primary">
                          {getDate(workspaceData.createdAt)}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                          Members
                        </h3>
                        <p className="text-workspace-text-primary">
                          {workspaceData.members || 0} active members
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
