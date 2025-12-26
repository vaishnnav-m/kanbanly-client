export interface AIChatPayload {
  workspaceId: string;
  projectId?: string;
  question: string;
  prevMessages?: AiMessage[];
}

export interface AiMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
