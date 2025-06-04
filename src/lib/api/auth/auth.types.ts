export interface User {
  id: string;
  firstName: string;
  lasName?: string;
  email: string;
  phone?: string;
  profile?: string;
  createdAt?: Date;
}

export interface SignupPayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  password: string;
  confirmPass?:string;
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
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
}
