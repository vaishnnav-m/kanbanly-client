import { User } from "../auth/auth.types";

export type UserProfileData = Pick<
  User,
  "firstName" | "lastName" | "email" | "createdAt" | "profile"
> & { isGoogleLogin: boolean };

export interface UpdateUserProfilePayload {
  firstName?: string;
  lastName?: string;
  profile?: string;
}

export interface UpdateUserPasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface INotificationPreference {
  email: boolean;
  app: boolean;
}

export interface PreferenceResponse {
  preferenceId: string;
  userId: string;
  taskAssigned: INotificationPreference;
  taskCompleted: INotificationPreference;
  dueDateReminder: INotificationPreference;
  mention: INotificationPreference;
  sprint: INotificationPreference;
  invitation: INotificationPreference;
}

export interface UpdatePreferencesPayload {
  taskAssigned?: Partial<INotificationPreference>;
  taskCompleted?: Partial<INotificationPreference>;
  dueDateReminder?: Partial<INotificationPreference>;
  mention?: Partial<INotificationPreference>;
  sprint?: Partial<INotificationPreference>;
  invitation?: Partial<INotificationPreference>;
}

export interface NotificationResponse {
  notificationId: string;
  userId: string;
  title: string;
  message: string;
  createdAt: Date;
  type?: "INVITATION" | "default";
  token?: string;
  workspaceName?: string;
}
