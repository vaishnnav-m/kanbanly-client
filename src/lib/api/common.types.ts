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

export type CommonFilters = {
  status?: string;
  priority?: string;
  search?: string;
};

export type BaseApiParams = {
  workspaceId: string;
  projectId: string;
  filters?: CommonFilters;
};
