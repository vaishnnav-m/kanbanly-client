import { TaskStatus, WorkItemType } from "./task.enum";

export interface BoardTask {
  taskId: string;
  task: string;
  status: TaskStatus;
  workItemType?: WorkItemType;
  assignedTo?: string;
}
