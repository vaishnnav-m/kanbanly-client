export interface MessageResponse {
  sender: string;
  content: string;
  timestamp: string;
  isSent: boolean;
  status: "sent" | "delivered" | "read";
  type: "text" | "image";
  imageUrl?: string;
}

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
  icon?: string;
  description?: string;
  createdAt: Date;
}
