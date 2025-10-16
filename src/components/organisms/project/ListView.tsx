"use client";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { RootState } from "@/store";
import { TaskPriority, TaskStatus } from "@/types/task.enum";
import { Select } from "@radix-ui/react-select";
import { Calendar, Ellipsis, Plus, Search } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { CreateTaskModal } from "../task/CreateTask";
import { TaskListing } from "@/lib/api/task/task.types";
import { useTaskPageContext } from "@/contexts/TaskPageContext";

interface ListViewProps {
  projectId: string;
  tasks: TaskListing[];
  handleStatusChange: (status: TaskStatus, taskId: string) => void;
  handlePriorityChange: (priority: TaskPriority, taskId: string) => void;
  filters: { status?: string; priority?: string; search?: string };
  setFilters: Dispatch<
    SetStateAction<{
      status?: string;
      priority?: string;
      search?: string;
    }>
  >;
}

export const ListView = ({
  tasks,
  projectId,
  handleStatusChange,
  handlePriorityChange,
  filters,
  setFilters,
}: ListViewProps) => {
  const { setSelectedTask, setIsTaskModalOpen } = useTaskPageContext();
  // priorities and status
  const statusValues = Object.values(TaskStatus);
  const priorites = Object.values(TaskPriority);

  const [isTaskCreationModalOpen, setIsTaskCreationModalOpen] = useState(false);
  const role = useSelector((state: RootState) => state.workspace.memberRole);
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {role !== "member" && (
            <Button
              onClick={() => setIsTaskCreationModalOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add task
            </Button>
          )}

          {/* filters */}
          <div className="flex items-center gap-2">
            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters({ ...filters, status: value })
              }
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {statusValues.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={filters.priority}
              onValueChange={(value) =>
                setFilters({ ...filters, priority: value })
              }
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {priorites.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* <Button className="hover:bg-primary/10" variant="outline" size="sm">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Sort
            </Button> */}
            {(filters.priority || filters.status) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setFilters({ status: "", priority: "", search: "" })
                }
              >
                Clear Filters ({activeFilterCount})
              </Button>
            )}
          </div>
        </div>
        {/* search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search tasks..." className="pl-10 w-64" />
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_200px_200px_200px_40px] gap-4 p-4 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
          <div>Name</div>
          <div>Status</div>
          <div>Priority</div>
          <div>Due Date</div>
        </div>

        {/* Tasks */}
        {tasks.length ? (
          tasks.map((task) => (
            <div
              key={task.taskId}
              className="grid grid-cols-[1fr_200px_200px_200px_40px] gap-4 p-4 border-b border-border hover:bg-muted/30 transition-colors group"
            >
              <div className="flex items-center">
                <span
                  className={`${
                    task.status === TaskStatus.Completed
                      ? "text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {task.task}
                </span>
              </div>

              <div className="flex items-center">
                <Select
                  value={task.status}
                  onValueChange={(value: string) =>
                    handleStatusChange(value as TaskStatus, task.taskId)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {statusValues.map((value) => (
                        <SelectItem
                          key={value}
                          className="focus:bg-slate-500/40"
                          value={value.toLowerCase()}
                        >
                          {value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center px-3">
                {role !== "member" ? (
                  <Select
                    value={task.priority}
                    onValueChange={(value: string) =>
                      handlePriorityChange(value as TaskPriority, task.taskId)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select The Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {priorites.map((value) => (
                          <SelectItem
                            key={value}
                            className="focus:bg-slate-500/40"
                            value={value.toLowerCase()}
                          >
                            {value}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <span>{task.priority}</span>
                )}
              </div>

              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 hover:bg-transparent"
                >
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  {task.dueDate ? (
                    <span>
                      {new Date(task.dueDate).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  ) : (
                    ""
                  )}
                </Button>
              </div>

              <div className="flex items-center relative">
                <Button
                  onClick={() => {
                    setSelectedTask(task.taskId);
                    setIsTaskModalOpen(true);
                  }}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-transparent"
                >
                  <Ellipsis className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full p-4 text-center">No Tasks</div>
        )}
      </div>
      <CreateTaskModal
        isOpen={isTaskCreationModalOpen}
        onClose={() => setIsTaskCreationModalOpen(false)}
        projectId={projectId}
      />
    </>
  );
};
