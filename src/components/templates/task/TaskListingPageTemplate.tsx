"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { TaskCreationPayload, TaskListing } from "@/lib/api/task/task.types";
import { TaskPriority, TaskStatus } from "@/types/task.enum";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { TaskDetails } from "@/components/organisms/task/TaskDetailModal";
import { useGetOneTask } from "@/lib/hooks/useTask";
import { BoardView } from "@/components/organisms/project/BoardView";
import { WorkspaceMember } from "@/lib/api/workspace/workspace.types";
import { ListView } from "@/components/organisms/project/ListView";
import { BacklogView } from "@/components/organisms/project/BacklogView";

interface TaskListingPageTemplateProps {
  projectId: string;
  tasks: TaskListing[] | [];
  createTask: (data: TaskCreationPayload) => void;
  isCreating: boolean;
  changeStatus: (newStatus: TaskStatus, taskId: string) => void;
  isRemoving: boolean;
  removeTask: (taskId: string) => void;
  workspaceId: string;
  handleEditTask: (taskId: string, data: Partial<TaskCreationPayload>) => void;
  isEditing: boolean;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  members: WorkspaceMember[] | [];
}

function TaskListingPageTemplate({
  projectId,
  tasks,
  createTask,
  isCreating,
  removeTask,
  workspaceId,
  changeStatus,
  handleEditTask,
  isEditing,
  setSearchTerm,
  members,
}: TaskListingPageTemplateProps) {
  const [selectedTask, setSelectedTask] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // task fetching according to id
  const { data: taskData } = useGetOneTask(
    workspaceId,
    projectId,
    selectedTask,
    {
      enabled: isTaskModalOpen && !!selectedTask,
    }
  );

  const boardTasks = tasks.map((task) => ({
    taskId: task.taskId,
    task: task.task,
    status: task.status,
    assignedTo: task.assignedTo as string,
    workItemType: task.workItemType,
  }));

  const [activeTab, setActiveTab] = useState("Board");
  const tabs = ["Board", "List", "Backlog", "Timeline"];

  const projectName = useSelector(
    (state: RootState) => state.project.projectName
  );

  // function handle status change
  function handleStatusChange(value: TaskStatus, taskId: string) {
    changeStatus(value, taskId);
  }

  // function to handle priority change
  function handlePriorityChange(value: TaskPriority, taskId: string) {
    handleEditTask(taskId, { priority: value });
  }

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
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
        {activeTab === "Board" && (
          <BoardView
            tasksData={boardTasks}
            createTask={createTask}
            isCreating={isCreating}
            handleStatusChange={handleStatusChange}
          />
        )}

        {activeTab === "List" && (
          <ListView
            projectId={projectId}
            tasks={tasks}
            handlePriorityChange={handlePriorityChange}
            handleStatusChange={handleStatusChange}
            setIsTaskModalOpen={setIsTaskModalOpen}
            setSelectedTask={setSelectedTask}
          />
        )}

        {activeTab === "Backlog" && (
          <BacklogView
          // tasks={tasks}
          // projectId={projectId}
          // handlePriorityChange={handlePriorityChange}
          // handleStatusChange={handleStatusChange}
          // setIsTaskModalOpen={setIsTaskModalOpen}
          // setSelectedTask={setSelectedTask}
          />
        )}
      </div>

      <TaskDetails
        handleEditTask={handleEditTask}
        removeTask={removeTask}
        isVisible={isTaskModalOpen}
        close={() => setIsTaskModalOpen(false)}
        task={taskData && taskData.data}
        setSearchTerm={setSearchTerm}
        members={members}
        onInvite={(taskId, data) => handleEditTask(taskId, data)}
        isEditing={isEditing}
      />
    </div>
  );
}

export default TaskListingPageTemplate;
