"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { TaskCreationPayload, TaskListing } from "@/lib/api/task/task.types";
import { TaskPriority, TaskStatus } from "@/types/task.enum";
import { projectTemplate } from "@/types/project.enum";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { TaskDetails } from "@/components/organisms/task/TaskDetailModal";
import { useGetOneTask } from "@/lib/hooks/useTask";
import { BoardView } from "@/components/organisms/project/BoardView";
import { WorkspaceMember } from "@/lib/api/workspace/workspace.types";
import { ListView } from "@/components/organisms/project/ListView";
import {
  BacklogView,
  Section,
} from "@/components/organisms/project/BacklogView";
import { IEpic } from "@/lib/api/epic/epic.types";
import { formatDataIntoSections } from "@/lib/task-utils";

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
  members: WorkspaceMember[] | [];
  addEpic: (title: string, color: string) => void;
  epics: IEpic[] | [];
  handleParentAttach: (
    parentType: "epic" | "task",
    parentId: string,
    taskId: string
  ) => void;
  isAttaching: boolean;
  filters: { status?: string; priority?: string; search?: string };
  setFilters: Dispatch<
    SetStateAction<{
      status?: string;
      priority?: string;
      search?: string;
    }>
  >;
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
  members,
  addEpic,
  epics,
  handleParentAttach,
  isAttaching,
  filters,
  setFilters,
}: TaskListingPageTemplateProps) {
  const [selectedTask, setSelectedTask] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const currentProjectTemplate = useSelector(
    (state: RootState) => state.project.projectTemplate
  );

  // task fetching according to id
  const { data: taskData } = useGetOneTask(
    workspaceId,
    projectId,
    selectedTask,
    {
      enabled: isTaskModalOpen && !!selectedTask,
    }
  );

  // map tasks to board view format
  const boardTasks = tasks.map((task) => ({
    taskId: task.taskId,
    task: task.task,
    status: task.status,
    assignedTo: task.assignedTo as WorkspaceMember,
    workItemType: task.workItemType,
  }));

  const formatedTasks: Section[] = formatDataIntoSections(tasks, members, []);

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
      <div className="border-b border-border">
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
            {tabs.map((tab) => {
              if (
                tab === "Backlog" &&
                currentProjectTemplate !== projectTemplate.scrum
              ) {
                return null;
              }
              return (
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
              );
            })}
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
            members={members}
            onInvite={(taskId, data) => handleEditTask(taskId, data)}
            setIsTaskModalOpen={setIsTaskModalOpen}
            setSelectedTask={setSelectedTask}
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
            filters={filters}
            setFilters={setFilters}
          />
        )}

        {activeTab === "Backlog" && (
          <BacklogView
            addEpic={addEpic}
            epics={epics}
            sectionsData={formatedTasks}
            createTask={createTask}
            handleStatusChange={handleStatusChange}
            handleParentAttach={handleParentAttach}
            isAttaching={isAttaching}
            setIsTaskModalOpen={setIsTaskModalOpen}
            setSelectedTask={setSelectedTask}
          />
        )}
      </div>

      <TaskDetails
        handleEditTask={handleEditTask}
        removeTask={removeTask}
        isVisible={isTaskModalOpen}
        close={() => setIsTaskModalOpen(false)}
        task={taskData && taskData.data}
        members={members}
        onInvite={(taskId, data) => handleEditTask(taskId, data)}
        isEditing={isEditing}
      />
    </div>
  );
}

export default TaskListingPageTemplate;
