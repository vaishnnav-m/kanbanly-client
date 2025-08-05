import { User } from "../auth/auth.types";

export type UserProfileData = Pick<
  User,
  "firstName" | "lastName" | "email" | "createdAt"
> & { isGoogleLogin: boolean };

export interface UpdateUserProfilePayload {
  firstName?: string;
  lastName?: string;
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
