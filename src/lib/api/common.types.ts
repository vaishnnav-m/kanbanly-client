export interface PaginatedResponse<T> {
  data: T;
  totalPages: number;
  total: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message: string;
}