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
import {
  BacklogView,
  Section,
} from "@/components/organisms/project/BacklogView";
import { IEpic } from "@/lib/api/epic/epic.types";

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
  addEpic: (title: string) => void;
  epics: IEpic[] | [];
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
  addEpic,
  epics,
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

  // map tasks to board view format
  const boardTasks = tasks.map((task) => ({
    taskId: task.taskId,
    task: task.task,
    status: task.status,
    assignedTo: task.assignedTo as string,
    workItemType: task.workItemType,
  }));

  // Helper to create initials
  const createFallback = (name: string) => {
    if (!name) return "?";
    const parts = name.split(" ");
    return parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : name.substring(0, 2).toUpperCase();
  };

  // filter tasks for backlog view
  interface Sprint {
    _id: string;
    title: string;
    startDate: string;
    endDate: string;
    status: string;
  }

  type Issue = {
    id: string;
    title: string;
    status: TaskStatus;
    assignee: { name: string; fallback: string };
  };

  const formatDataIntoSections = (
    tasks: TaskListing[],
    members: WorkspaceMember[],
    sprints: Sprint[]
  ): Section[] => {
    // Step 1: Group tasks by sprintId. This is highly efficient for lookups later.
    const tasksBySprint = tasks.reduce<Record<string, TaskListing[]>>((acc, task) => {
      const key = task.sprintId || "backlog";
      if (!acc[key]) acc[key] = [];
      acc[key].push(task);
      return acc;
    }, {});

    // Reusable helper to format raw task objects into the 'issue' structure
    const createIssuesArray = (rawTasks: TaskListing[]): Issue[] => {
      return rawTasks.map((task) => {
        const member = members.find((m) => m._id === task.assignedTo);
        const assignee = member
          ? { name: member.name, fallback: createFallback(member.name) }
          : { name: "Unassigned", fallback: "U" };
        return {
          id: task.taskId,
          title: task.task,
          status: task.status,
          assignee,
        };
      });
    };

    // Step 2: Create sections for each sprint from the backend
    const sprintSections: Section[] = sprints.map((sprint) => {
      const sprintTasks = tasksBySprint[sprint._id] || []; // Gracefully handle sprints with no tasks
      const issues = createIssuesArray(sprintTasks);

      // Format the date for the subtitle
      const formatDate = (dateString: string): string =>
        new Date(dateString).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        });

      return {
        id: sprint._id,
        title: sprint.title,
        subtitle: `${formatDate(sprint.startDate)} - ${formatDate(
          sprint.endDate
        )}`,
        type: "sprint",
        issueCount: issues.length,
        sprintStatus: sprint.status,
        expanded: true,
        issues: issues,
      };
    });

    // Step 3: Create the backlog section if there are any backlog tasks
    const backlogTasks = tasksBySprint.backlog || [];
    const allSections: Section[] = [...sprintSections];

    if (backlogTasks.length > 0) {
      const backlogIssues = createIssuesArray(backlogTasks);
      allSections.push({
        id: "backlog-section",
        title: "Backlog",
        subtitle: "",
        type: "backlog",
        issueCount: backlogIssues.length,
        sprintStatus: "",
        expanded: true,
        issues: backlogIssues,
      });
    }

    return allSections;
  };

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
            addEpic={addEpic}
            epics={epics}
            tasks={formatedTasks}
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
