import { TableColumn } from "@/types/table.types";
import { ITask, TaskListing } from "../api/task/task.types";
import { TaskPriority, TaskStatus } from "@/types/task.enum";
import {
  PriorityBadge,
  WorkItemTypeIcon,
} from "../constants/workitem.constats";
import { AssigneeCard } from "@/components/molecules/task/AssigneeCard";
import { Button } from "@/components/atoms/button";
import { Calendar, MoreHorizontal } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface TaskColumnProps {
  handleStatusChange: (value: TaskStatus, taskId: string) => void;
  handlePriorityChange: (value: TaskPriority, taskId: string) => void;
  setIsTaskModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedTask: Dispatch<SetStateAction<string>>;
}

interface SubTaskColumnProps {
  handleStatusChange: (value: TaskStatus, taskId: string) => void;
}

export const createSubTaskColumns = ({
  handleStatusChange,
}: SubTaskColumnProps): TableColumn<ITask>[] => {
  const columns: TableColumn<ITask>[] = [
    {
      key: "task",
      label: "Task",
      type: "text",
      cellClassName: "max-w-[10px] truncate",
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: Object.values(TaskStatus).map((status) => ({
        label: status,
        value: status,
      })),
      onChange: (row, value) =>
        handleStatusChange(value as TaskStatus, row.taskId),
    },
    {
      key: "priority",
      label: "Priority",
      type: "custom",
      render: (row, value) => <PriorityBadge priority={value} />,
    },
    {
      key: "assignedTo",
      label: "Assigned To",
      type: "custom",
      render: (row, value) => (
        <AssigneeCard assignedTo={value} taskId={row.taskId} />
      ),
    },
  ];

  return columns;
};

export const createTaskColumns = ({
  handleStatusChange,
  handlePriorityChange,
  setIsTaskModalOpen,
  setSelectedTask,
}: TaskColumnProps): TableColumn<TaskListing>[] => {
  const columns: TableColumn<TaskListing>[] = [
    {
      key: "workItemType",
      label: "Type",
      type: "custom",
      render: (row, value) => <WorkItemTypeIcon type={value} />,
    },
    {
      key: "task",
      label: "Task",
      type: "text",
      cellClassName: "max-w-[10px] truncate",
    },
    {
      key: "createdBy",
      label: "Created By",
      type: "custom",
      render: (row, value) => (
        <div className="space-x-2">
          <AssigneeCard assignedTo={value} taskId={row.taskId} />
          <span className="opacity-0 xl:opacity-100">{value?.name}</span>
        </div>
      ),
    },
    {
      key: "assignedTo",
      label: "Assigned To",
      type: "custom",
      render: (row, value) => (
        <div className="space-x-2">
          <AssigneeCard assignedTo={value} taskId={row.taskId} />
          <span className="opacity-0 xl:opacity-100">{value?.name}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: Object.values(TaskStatus).map((status) => ({
        label: status,
        value: status,
      })),
      onChange: (row, value) =>
        handleStatusChange(value as TaskStatus, row.taskId),
      cellClassName: "bg-inherit",
    },
    {
      key: "priority",
      label: "Priority",
      type: "select",
      options: Object.values(TaskPriority).map((priority) => ({
        label: priority,
        value: priority,
      })),
      onChange: (row, value) =>
        handlePriorityChange(value as TaskPriority, row.taskId),
      cellClassName: "bg-inherit",
    },
    {
      key: "dueDate",
      label: "Due Date",
      type: "custom",
      render: (row, dueDate) => (
        <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          {dueDate ? (
            <span>
              {new Date(dueDate).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          ) : (
            <span className="text-sm text-gray-500">None</span>
          )}
        </Button>
      ),
    },
    {
      key: "",
      label: "Manage",
      type: "custom",
      render: (row) => (
        <Button
          onClick={() => {
            setIsTaskModalOpen(true);
            setSelectedTask(row.taskId);
          }}
          variant="ghost"
          size="sm"
          className="p-0 hover:bg-transparent"
        >
          <MoreHorizontal />
        </Button>
      ),
    },
  ];

  return columns;
};
