export enum ActivityTypeEnum {
  TASK = "TASK",
  PROJECT = "PROJECT",
  WORKSPACE = "WORKSPACE",
  COMMENT = "COMMENT",
  EPIC = "EPIC",
  SPRINT = "SPRINT",
}

export enum TaskActivityActionEnum {
  TaskCreated = "task_created",
  TaskUpdated = "task_updated",
  StatusChanged = "status_changed",
  Commented = "commented",
  SprintAttached = "sprint_attached",
  TaskAssigned = "task_assigned",
  CommentEdited = "comment_edited",
  CommentDeleted = "comment_deleted",
  SprintDetached = "sprint_detached",
}

export interface ActivityResponse {
  activityId: string;
  workspaceId: string;
  projectId?: string;
  taskId?: string;
  entityId: string;
  entityType: ActivityTypeEnum;
  action: TaskActivityActionEnum;
  oldValue?: Record<string, string | boolean>;
  newValue?: Record<string, string | boolean>;
  member: {
    userId: string;
    name: string;
    email: string;
    profile?: string;
  };
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
