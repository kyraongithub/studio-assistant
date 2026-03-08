export type Role = "user" | "assistant" | "system";

export interface ChatMessage {
  id?: string;
  role: Role;
  content: string;
}

export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
  history: ChatMessage[];
}
