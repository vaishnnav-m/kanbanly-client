export enum ActivityTypeEnum {
  TASK = "TASK",
  PROJECT = "PROJECT",
  WORKSPACE = "WORKSPACE",
  COMMENT = "COMMENT",
  EPIC = "EPIC",
  SPRINT = "SPRINT",
}

export interface IActivity {
  activityId: string;
  workspaceId: string;
  projectId?: string;
  taskId?: string;
  entityId: string;
  entityType: ActivityTypeEnum;
  action: string;
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
