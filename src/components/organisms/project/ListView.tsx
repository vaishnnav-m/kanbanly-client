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
import { Plus, Search } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { CreateTaskModal } from "../task/CreateTask";
import { TaskListing } from "@/lib/api/task/task.types";
import CustomTable from "../CustomTable";
import { createTaskColumns } from "@/lib/columns/task.column";
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
  const permissions = useSelector((state: RootState) => state.workspace.permissions);
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const taskColumns = createTaskColumns({
    handleStatusChange,
    handlePriorityChange,
    setIsTaskModalOpen,
    setSelectedTask,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-3 bg-gray-200 dark:bg-gray-800/20 p-3 rounded-lg border-b border-border">
        <div className="flex items-center gap-3">
          {permissions?.taskCreate && (
            <Button
              variant="ghost"
              onClick={() => setIsTaskCreationModalOpen(true)}
              className="text-gray-400 bg-card hover:bg-card/90 border border-border"
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
              <SelectTrigger className="w-[150px] dark:bg-card/60">
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
              <SelectTrigger className="w-[150px] dark:bg-card/60">
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
          <Input
            placeholder="Search tasks..."
            className="pl-10 w-64 dark:bg-card/60"
          />
        </div>
      </div>
      <CustomTable<TaskListing>
        columns={taskColumns}
        data={tasks}
        className="bg-gray-200 dark:bg-gray-800/20 rounded-xl"
        getRowKey={(row) => row.taskId}
      />
      <CreateTaskModal
        isOpen={isTaskCreationModalOpen}
        onClose={() => setIsTaskCreationModalOpen(false)}
        projectId={projectId}
      />
    </div>
  );
};
