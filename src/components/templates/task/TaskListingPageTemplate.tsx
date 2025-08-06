"use client";
import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
  CheckCircle2,
  User,
  Trash,
  Ellipsis,
} from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { TaskListing } from "@/lib/api/task/task.types";
import { TaskPriority, TaskStatus } from "@/types/task.enum";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CreateTaskModal } from "@/components/organisms/task/CreateTask";
import { ConfirmationModal } from "@/components/organisms/admin/ConfirmationModal";
import { TaskDetails } from "@/components/organisms/task/TaskDetailModal";
import { useGetOneTask } from "@/lib/hooks/useTask";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";

interface TaskListingPageTemplateProps {
  projectId: string;
  tasks: TaskListing[] | [];
  changeStatus: (newStatus: TaskStatus, taskId: string) => void;
  isRemoving: boolean;
  removeTask: (taskId: string) => void;
  workspaceId: string;
}

function TaskListingPageTemplate({
  tasks,
  projectId,
  isRemoving,
  removeTask,
  workspaceId,
  changeStatus,
}: TaskListingPageTemplateProps) {
  const [selectedTask, setSelectedTask] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const role = useSelector((state: RootState) => state.workspace.memberRole);

  // editing states
  // const [editingStatus, setEditingStaus] = useState<TaskStatus | null>(null);

  // task fetching according to id
  const { data: taskData } = useGetOneTask(
    workspaceId,
    projectId,
    selectedTask,
    {
      enabled: isTaskModalOpen && !!selectedTask,
    }
  );

  const [activeTab, setActiveTab] = useState("List");
  const tabs = ["Overview", "List", "Board", "Timeline"];

  const projectName = useSelector(
    (state: RootState) => state.project.projectName
  );

  // modals
  const [isModalOpen, setIsModalOpen] = useState(false);

  // priorities and status
  const statusValues = Object.keys(TaskStatus);
  const priorites = Object.keys(TaskPriority);

  // function handle status change
  function handleChange(value: TaskStatus, taskId: string) {
    changeStatus(value, taskId);
  }

  return (
    <div className="min-h-screen bg-background max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-lg font-semibold text-foreground">
                {projectName}
              </h1>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <div className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add task
            </Button>
            <div className="flex items-center gap-2">
              <Button
                className="hover:bg-primary/10"
                variant="outline"
                size="sm"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button
                className="hover:bg-primary/10"
                variant="outline"
                size="sm"
              >
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search tasks..." className="pl-10 w-64" />
          </div>
        </div>

        {/* Task Table */}
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
                      handleChange(value as TaskStatus, task.taskId)
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
                    <Select value={task.priority}>
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
      </div>
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectId={projectId}
      />

      <TaskDetails
        removeTask={removeTask}
        isVisible={isTaskModalOpen}
        close={() => setIsTaskModalOpen(false)}
        task={taskData && taskData.data}
      />
    </div>
  );
}

export default TaskListingPageTemplate;
