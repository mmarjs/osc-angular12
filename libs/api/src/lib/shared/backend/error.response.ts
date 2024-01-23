/**
 * Convenience adjustment of the backend response
 */
export interface ApiError {
  error: string;
  message: string;
  path?: string;
  status?: number;
  timestamp?: string;
}
