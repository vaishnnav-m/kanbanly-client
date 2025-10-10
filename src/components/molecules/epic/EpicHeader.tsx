import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { CardHeader } from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { workItemStatusColors } from "@/lib/constants/color.constants";
import { hasPermission, PERMISSIONS } from "@/lib/utils";
import { workspaceRoles } from "@/types/roles.enum";
import { TaskStatus } from "@/types/task.enum";
import { PenBox, Trash, X } from "lucide-react";

interface EpicHeaderProps {
  name: string;
  status: TaskStatus;
  memberRole: workspaceRoles;
  setIsConfirmationOpen: (isOpen: boolean) => void;
  setEditingName: (name: string | null) => void;
  editingName: string | null;
  close: () => void;
}

export const EpicHeader = ({
  name,
  status,
  memberRole,
  setIsConfirmationOpen,
  setEditingName,
  editingName,
  close,
}: EpicHeaderProps) => {
  const canDelete = hasPermission(memberRole, PERMISSIONS.DELETE_EPIC);
  const canEdit = hasPermission(memberRole, PERMISSIONS.EDIT_EPIC);

  const statusColors = workItemStatusColors[status];

  return (
    <CardHeader className="flex-shrink-0 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Badge
            variant="secondary"
            className={`${statusColors && statusColors.bg} ${
              statusColors && statusColors.text
            }`}
          >
            {status}
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          {canDelete && (
            <Button
              onClick={() => setIsConfirmationOpen(true)}
              className="hover:bg-muted-foreground/20"
              variant="ghost"
              size="sm"
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
          <Button
            className="hover:bg-muted-foreground/20"
            variant="ghost"
            size="sm"
            onClick={close}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {editingName !== null ? (
        <Input
          value={editingName}
          onChange={(e) => setEditingName(e.target.value)}
        />
      ) : (
        <h2 className="text-2xl font-bold tracking-tight text-foreground mt-2">
          {name}
          {canEdit && (
            <PenBox
              onClick={() => setEditingName(name || "")}
              className="size-3 cursor-pointer inline ml-2"
            />
          )}
        </h2>
      )}
    </CardHeader>
  );
};
