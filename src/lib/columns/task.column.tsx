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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";

interface TaskColumnProps {
  handleStatusChange: (value: TaskStatus, taskId: string) => void;
  handlePriorityChange: (value: TaskPriority, taskId: string) => void;
  setIsTaskModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedTask: Dispatch<SetStateAction<string>>;
}

interface SubTaskColumnProps {
  handleStatusChange: (value: TaskStatus, taskId: string) => void;
  view: "epic" | "sub-task";
  setSelectedTask?: Dispatch<SetStateAction<string>>;
}

const statusValues = Object.values(TaskStatus);

export const createSubTaskColumns = ({
  handleStatusChange,
  view,
  setSelectedTask,
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
      type: "custom",
      render: (row, status) => {
        return (
          <Select
            value={status}
            onValueChange={(value: string) =>
              handleStatusChange(value as TaskStatus, row.taskId)
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
        );
      },
    },
    {
      key: "priority",
      label: "Priority",
      type: "custom",
      render: (row, value) => <PriorityBadge priority={value} />,
    },
    ...(view === "epic"
      ? ([
          {
            key: "assignedTo",
            label: "Assigned To",
            type: "custom",
            render: (row, value) => (
              <AssigneeCard assignedTo={value} taskId={row.taskId} />
            ),
          },
        ] as TableColumn<ITask>[])
      : []),
    {
      key: "dueDate",
      label: "Due Date",
      type: "custom",
      render: (row, dueDate) => (
        <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
          <Calendar className="w-4 h-4 text-sm text-muted-foreground" />
          {dueDate ? (
            <span className="text-sm text-muted-foreground">
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
            if (setSelectedTask) setSelectedTask(row.taskId);
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
        <div className="space-x-2 flex items-center">
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
        <div className="space-x-2 flex items-center">
          <AssigneeCard assignedTo={value} taskId={row.taskId} />
          <span className="opacity-0 xl:opacity-100">
            {value?.name ? value.name : "Unassigned"}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      type: "custom",
      render: (row, status) => {
        return (
          <Select
            value={status}
            onValueChange={(value: string) =>
              handleStatusChange(value as TaskStatus, row.taskId)
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
        );
      },
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
