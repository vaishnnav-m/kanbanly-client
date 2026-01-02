import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { WorkItemType, TaskStatus, TaskPriority } from "@/types/task.enum";
import { Plus } from "lucide-react";
import { WorkItemCreationInput } from "./WorkItemCreationInput";
import { useState } from "react";
import { ITask, TaskCreationPayload } from "@/lib/api/task/task.types";
import { createSubTaskColumns } from "@/lib/columns/task.column";
import CustomTable from "@/components/organisms/CustomTable";
import { useTaskPageContext } from "@/contexts/TaskPageContext";

interface SubTasksProps {
  createTask: (data: TaskCreationPayload) => void;
  taskId: string;
  subTasks?: ITask[];
  workItemType: WorkItemType;
}

export const SubTasks = ({
  createTask,
  taskId,
  subTasks,
  workItemType,
}: SubTasksProps) => {
  const [isCreatingIssue, setIsCreatingIssue] = useState(false);
  const { handleStatusChange, setSelectedTask } = useTaskPageContext();

  function handleCancelCreation() {
    setIsCreatingIssue(false);
  }

  function handleConfirmCreation(data: {
    newIssueTitle: string;
    newIssueType: string;
  }) {
    if (!data.newIssueTitle.trim()) return;

    createTask({
      task: data.newIssueTitle,
      workItemType: data.newIssueType as WorkItemType,
      status: TaskStatus.Todo,
      priority: TaskPriority.low,
      parentId: taskId,
    });

    handleCancelCreation();
  }

  const columns = createSubTaskColumns({
    handleStatusChange,
    view: "sub-task",
    setSelectedTask,
  });

  if (workItemType === WorkItemType.Subtask) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Subtasks
          {subTasks && subTasks.length > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs">
              {subTasks.length}
            </Badge>
          )}
        </h3>
      </div>

      {subTasks && subTasks.length > 0 ? (
        <div className="w-full rounded-lg border border-border overflow-hidden">
          <CustomTable
            columns={columns}
            data={subTasks}
            emptyMessage="No children"
            getRowKey={(row) => row.taskId}
          />
        </div>
      ) : (
        !isCreatingIssue && (
          <div className="text-center py-12 rounded-lg border border-dashed border-border bg-muted/20">
            <p className="text-sm text-muted-foreground mb-4">
              No subtasks yet
            </p>
          </div>
        )
      )}

      {isCreatingIssue ? (
        <WorkItemCreationInput
          view="detail"
          handleCancelCreation={handleCancelCreation}
          handleConfirmCreation={handleConfirmCreation}
        />
      ) : (
        <Button
          variant="outline"
          className="w-full py-6 h-auto rounded-lg border-dashed hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            setIsCreatingIssue(true);
          }}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Child Item</span>
        </Button>
      )}
    </div>
  );
};