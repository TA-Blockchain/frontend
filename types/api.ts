export type ApiResponse<T> = {
  code: string;
  data: T;
};

export type ApiError = {
  message: string;
};

export type UninterceptedApiError = {
  error: string;
  message: string;
};

export interface PaginatedApiResponse<T> {
  code: number;
  status: string;
  data: T;
  meta: {
    last_page: number;
    total: number;
  };
}
