export interface ChatCreationPayload {
  workspaceId: string;
  memberId: string;
}

export interface ChatListingItem {
  chatId: string;
  type: "direct" | "project";
  name: string;
  icon?: string;
}

export interface ChatResponse {
  chatId: string;
  name: string;
  type: "direct" | "project";
  projectId?: string;
  icon?: string;
  description?: string;
  createdAt: Date;
}
