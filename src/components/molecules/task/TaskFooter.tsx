import { format, formatDistanceToNow } from "date-fns";
import { AssigneeCard } from "./AssigneeCard";

interface TaskFooterProps {
  taskId: string;
  createdBy: {
    email: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const TaskFooter = ({
  taskId,
  createdBy,
  createdAt,
  updatedAt,
}: TaskFooterProps) => {
  return (
    <div className="m-2 rounded-lg border border-border bg-muted/50 p-4 space-y-4">
      {/* Created By */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Created By
        </label>
        <div className="flex items-center gap-2">
          <AssigneeCard taskId={taskId} assignedTo={createdBy} />
          <span className="text-sm font-medium">{createdBy.name}</span>
        </div>
      </div>
      <div className="h-px bg-border" /> {/* Divider */}
      {/* Timestamps */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Created</span>
          <span className="font-medium">
            {format(new Date(createdAt), "MMM d, yyyy 'at' h:mm a")}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Updated</span>
          <span className="font-medium">
            {formatDistanceToNow(new Date(updatedAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
