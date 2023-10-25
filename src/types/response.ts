export interface IResponse<T = unknown> {
  success: boolean;
  data: T;
}

export interface PageData<T = unknown> {
  total: number;
  currentPage: number;
  rows: T[];
}

export interface IListResponse<T = unknown> extends IResponse {
  data: PageData<T>;
}
