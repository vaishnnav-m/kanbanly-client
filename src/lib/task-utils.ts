import { Section } from "@/components/organisms/project/BacklogView";
import { TaskListing } from "./api/task/task.types";
import { WorkspaceMember } from "./api/workspace/workspace.types";
import { TaskStatus } from "@/types/task.enum";

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

  //create the backlog section
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
