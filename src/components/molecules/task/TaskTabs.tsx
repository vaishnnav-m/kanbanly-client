import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs";
import { TaskPriority, TaskStatus, WorkItemType } from "@/types/task.enum";
import { Plus } from "lucide-react";
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
}

export const TaskTabs = ({ createTask, taskId, subTasks }: TaskTabsProps) => {
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
      <TabsList className="grid w-full grid-cols-3 bg-transparent">
        <TabsTrigger value="subtasks">Subtasks</TabsTrigger>
        <TabsTrigger value="comments">
          Comments{" "}
          <Badge variant="secondary" className="ml-1 h-4 px-1.5 text-xs">
            3
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="activities">Activities</TabsTrigger>
      </TabsList>

      <TabsContent
        value="subtasks"
        className={`w-full mt-4 flex flex-col ${
          subTasks?.length ? "" : "items-center"
        } gap-4`}
      >
        {subTasks?.length ? (
          <div className="w-full rounded-md border">
            <CustomTable
              columns={columns}
              data={subTasks || []}
              emptyMessage="No children"
            />
          </div>
        ) : (
          ""
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
            className="w-fit px-2 py-1 h-fit rounded-full text-xs font-mono flex items-center bg-inherit text-white/70"
            onClick={(e) => {
              e.stopPropagation();
              setIsCreatingIssue(true);
            }}
          >
            <Plus className="size-3 mr-1" />
            Add Child
          </Button>
        )}
      </TabsContent>

      <TabsContent value="comments" className="mt-4">
        <div className="text-center py-8 text-muted-foreground rounded-md border">
          <span className="text-sm">No comments yet</span>
        </div>
      </TabsContent>

      <TabsContent value="activities" className="mt-4">
        <div className="text-center py-8 text-muted-foreground rounded-md border">
          <span className="text-sm">No recent activities</span>
        </div>
      </TabsContent>
    </Tabs>
  );
};
