import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs";
import { TaskPriority, TaskStatus, WorkItemType } from "@/types/task.enum";
import { Activity, MessageSquare, Plus } from "lucide-react";
import { WorkItemCreationInput } from "./WorkItemCreationInput";
import { useState } from "react";
import { ITask, TaskCreationPayload } from "@/lib/api/task/task.types";
import { createSubTaskColumns } from "@/lib/columns/task.column";
import CustomTable from "@/components/organisms/CustomTable";
import { useTaskPageContext } from "@/contexts/TaskPageContext";

interface TaskTabsProps {
  createTask: (data: TaskCreationPayload) => void;
  taskId: string;
  subTasks?: ITask[];
  workItemType: WorkItemType;
}

export const TaskTabs = ({
  createTask,
  taskId,
  subTasks,
  workItemType,
}: TaskTabsProps) => {
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

  return (
    <Tabs defaultValue="subtasks" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1">
        <TabsTrigger
          value="subtasks"
          className="text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          Subtasks
          {subTasks && subTasks.length > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs">
              {subTasks.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger
          value="comments"
          className="text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
          Comments
          <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs">
            3
          </Badge>
        </TabsTrigger>
        <TabsTrigger
          value="activities"
          className="text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <Activity className="w-3.5 h-3.5 mr-1.5" />
          Activity
        </TabsTrigger>
      </TabsList>

      {workItemType !== WorkItemType.Subtask && (
        <TabsContent
          value="subtasks"
          className="w-full mt-6 flex flex-col gap-4"
        >
          {subTasks && subTasks.length > 0 ? (
            <div className="w-full rounded-lg border border-border overflow-hidden">
              <CustomTable
                columns={columns}
                data={subTasks}
                emptyMessage="No children"
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
        </TabsContent>
      )}

      <TabsContent value="comments" className="mt-6">
        <div className="text-center py-12 rounded-lg border border-border bg-muted/20">
          <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground mb-1">
            No comments yet
          </p>
          <p className="text-xs text-muted-foreground">
            Start a conversation about this task
          </p>
        </div>
      </TabsContent>

      <TabsContent value="activities" className="mt-6">
        <div className="text-center py-12 rounded-lg border border-border bg-muted/20">
          <Activity className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground mb-1">
            No recent activity
          </p>
          <p className="text-xs text-muted-foreground">
            Activity will appear here as changes are made
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
};
