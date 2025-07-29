export interface User {
  _id: string;
  userId: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  profile?: string;
  createdAt?: Date;
  isEmailVerified?: boolean;
  isActive?: boolean;
}

export interface SignupPayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  password: string;
  confirmPass?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponseData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
}
