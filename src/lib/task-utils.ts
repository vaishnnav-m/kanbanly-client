import { Bug, CheckSquare, FileText, Star, HelpCircle } from "lucide-react";
import { Issue, Section } from "@/components/organisms/project/BacklogView";
import { TaskListing } from "./api/task/task.types";
import { WorkspaceMember } from "./api/workspace/workspace.types";
import { WorkItemType } from "@/types/task.enum";

// filter tasks for backlog view
interface Sprint {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
}

// function to format data into sections
export const formatDataIntoSections = (
  tasks: TaskListing[],
  members: WorkspaceMember[],
  sprints: Sprint[]
): Section[] => {
  // Step 1: Group tasks by sprintId. This is highly efficient for lookups later.
  const tasksBySprint = tasks.reduce<Record<string, TaskListing[]>>(
    (acc, task) => {
      const key = task.sprintId || "backlog";
      if (!acc[key]) acc[key] = [];
      acc[key].push(task);
      return acc;
    },
    {}
  );

  // Reusable helper to format raw task objects into the 'issue' structure
  const createIssuesArray = (rawTasks: TaskListing[]): Issue[] => {
    return rawTasks.map((task) => {
      const member = members.find((m) => m._id === task.assignedTo);
      return {
        id: task.taskId,
        epicId: task.epicId,
        epic: task.epic,
        sprintId: task.sprintId,
        title: task.task,
        workItemType: task.workItemType,
        status: task.status,
        assignee: member,
      };
    });
  };

  // Create sections for each sprint from the backend
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

  // create the backlog section
  const backlogTasks = tasksBySprint.backlog || [];
  const backlogIssues = createIssuesArray(backlogTasks);

  const allSections: Section[] = [...sprintSections];

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

  return allSections;
};

// function to get WORK ITEM TYPE

const issueTypeConfig = {
  [WorkItemType.Task]: {
    label: "Task",
    icon: CheckSquare,
    className: "text-blue-500",
  },
  [WorkItemType.Story]: {
    label: "Story",
    icon: FileText,
    className: "text-green-500",
  },
  [WorkItemType.Feature]: {
    label: "Feature",
    icon: Star,
    className: "text-purple-500",
  },
  [WorkItemType.Bug]: {
    label: "Bug",
    icon: Bug,
    className: "text-red-500",
  },
};

// Helper Function
export function getWorkItemTypeIcon(type: WorkItemType) {
  const config = issueTypeConfig[type] || {
    icon: HelpCircle,
    className: "text-gray-500",
  };

  return { icon: config.icon, className: config.className };
}

// function to get the avathar
export function getAssignedTo(assignedTo: WorkspaceMember) {
  return assignedTo.email[0].toUpperCase();
}
