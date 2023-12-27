export interface IResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PageData<T = unknown> {
  totalPage: number;
  currentPage: number;
  rows: T[];
}

export interface IListResponse<T = unknown> extends IResponse {
  data: PageData<T>;
}
