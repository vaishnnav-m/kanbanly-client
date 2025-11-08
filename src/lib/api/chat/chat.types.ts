export interface ChatCreationPayload {
  workspaceId: string;
  memberId: string;
}

export interface IChatListing {
  chatId: string;
  type: "direct" | "project";
  name: string;
  icon?: string;
}
