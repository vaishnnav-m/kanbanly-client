"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { Button } from "@/components/atoms/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { TaskEpic } from "@/lib/api/epic/epic.types";
import { WorkspaceMember } from "@/lib/api/workspace/workspace.types";
import { getAssignedTo, getWorkItemTypeIcon } from "@/lib/task-utils";
import { TaskStatus, WorkItemType } from "@/types/task.enum";
import { Plus } from "lucide-react";

interface IssueCardProps {
  id: string;
  title: string;
  status: TaskStatus;
  workItemType: WorkItemType;
  epic?: TaskEpic;
  assignee?: WorkspaceMember;
  handleStatusChange: (value: TaskStatus, taskId: string) => void;
  handleParentAttach: (
    parentType: "epic" | "task",
    parentId: string,
    taskId: string
  ) => void;
  isAttaching: boolean;
}

export function IssueCard({
  id,
  title,
  status,
  workItemType,
  epic,
  assignee,
  handleStatusChange,
  handleParentAttach,
  isAttaching,
}: IssueCardProps) {
  const statusValues = Object.values(TaskStatus);

  const IconComponent = getWorkItemTypeIcon(workItemType).icon;

  function handleEpicAdd() {
    console.log("working");
    handleParentAttach("epic", "asdf", id);
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-backlog-section border border-border rounded-md hover:bg-issue-hover transition-colors group">
      {/* Work Item Type Icon and Label */}
      <span className="flex items-center gap-1 flex-shrink-0">
        {
          <IconComponent
            className={`size-4 ${getWorkItemTypeIcon(workItemType).className}`}
          />
        }
      </span>

      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-sm text-foreground flex-1 truncate">{title}</span>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        {epic ? (
          <span
            style={{ background: epic.color || "" }}
            className={`border py-1 px-2 rounded-full text-xs font-mono max-w-40 truncate`}
          >
            {epic.title}
          </span>
        ) : (
          <Button
            onClick={handleEpicAdd}
            variant="outline"
            className="px-2 py-1 h-fit rounded-full text-xs font-mono flex items-center"
          >
            <Plus className="pb-[2px]" />
            {isAttaching ? "Attaching..." : "Add Epic"}
          </Button>
        )}
        <Select
          value={status}
          onValueChange={(value: string) =>
            handleStatusChange(value as TaskStatus, id)
          }
        >
          <SelectTrigger
            className={`w-fit h-fit px-2 py-1 text-xs rounded-full border border-spacing-1 focus:ring-0 focus:outline-none shadow-none ${
              status === TaskStatus.Todo
                ? "bg-yellow-500 text-yellow-900"
                : status === TaskStatus.InProgress
                ? "bg-blue-500 text-blue-900"
                : status === TaskStatus.Completed
                ? "bg-emerald-500 text-emerald-900"
                : ""
            }`}
            style={{
              boxShadow: "none",
              outline: "none",
            }}
          >
            <SelectValue className="text-sm h-fit w-fit">
              {status.toUpperCase()}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {statusValues
              .filter((value) => value !== status)
              .map((value) => (
                <SelectItem
                  key={value}
                  className={`rounded-full flex justify-center border-0 focus:ring-0 focus:outline-none shadow-none my-2 ${
                    value === TaskStatus.Todo
                      ? "bg-yellow-500 text-yellow-900 hover:!bg-yellow-600 focus:!bg-yellow-600"
                      : value === TaskStatus.InProgress
                      ? "bg-blue-500 text-blue-900 hover:!bg-blue-600 focus:!bg-blue-600"
                      : value === TaskStatus.Completed
                      ? "bg-emerald-500 text-emerald-900 hover:!bg-emerald-600 focus:!bg-emerald-600"
                      : ""
                  }`}
                  style={{
                    boxShadow: "none",
                    outline: "none",
                  }}
                  value={value}
                >
                  <span className="mr-5">{value.toUpperCase()}</span>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        {assignee && (
          <Avatar className="w-7 h-7">
            <AvatarImage />
            <AvatarFallback className="text-xs">
              {getAssignedTo(assignee)}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}
