export interface CommonErrorResponse {
  response: {
    data: ErrorResponse;
    status: number;
  };
}

export interface ErrorResponse {
  error: {
    message?: string;
    statusCode: number;
  } & string;
  status?: number;
}
export interface ApiError {
  message: string;
  errorCode: string;
}
