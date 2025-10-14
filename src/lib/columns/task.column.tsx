import { TableColumn } from "@/types/table.types";
import { ITask } from "../api/task/task.types";
import { TaskStatus } from "@/types/task.enum";
import { PriorityBadge } from "../constants/workitem.constats";
import { AssigneeCard } from "@/components/molecules/task/AssigneeCard";
import { WorkspaceMember } from "../api/workspace/workspace.types";

interface TaskColumnProps {
  members: WorkspaceMember[];
  onInviteMember: (
    taskId: string,
    data: {
      assignedTo: string;
    }
  ) => void;
  handleStatusChange: (value: TaskStatus, taskId: string) => void;
}

export const createTaskColumns = ({
  members,
  onInviteMember,
  handleStatusChange,
}: TaskColumnProps): TableColumn<ITask>[] => {
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
        <AssigneeCard
          members={members}
          assignedTo={value}
          onInvite={onInviteMember}
          taskId={row.taskId}
        />
      ),
    },
  ];

  return columns;
};
