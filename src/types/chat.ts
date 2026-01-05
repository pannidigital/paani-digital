export interface ChatError extends Error {
  status?: number;
  details?: string;
}

export interface ChatResponse {
  response?: string;
  error?: string;
  details?: string;
}