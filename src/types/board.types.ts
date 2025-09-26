import { TaskStatus, TaskType } from "./task.enum";

export interface BoardTask {
  taskId: string;
  task: string;
  status: TaskStatus;
  assignedTo?: string;
  type?: TaskType;
}
