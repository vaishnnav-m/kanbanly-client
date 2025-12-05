export interface AnalyticsSummary {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  totalActiveSubscriptions: number;
}

export interface SalesAnalytics {
  date: string;
  count: number;
}

export interface UserAnalytics {
  date: string;
  count: number;
}

export interface PlanBreakdownItem {
  planName: string;
  count: number;
}

export interface AnalyticsResponse {
  summary: AnalyticsSummary;
  salesAnalytics: SalesAnalytics[];
  userAnalytics: UserAnalytics[];
  planBreakdown: PlanBreakdownItem[];
}
