export interface IResponse {
  success: boolean
  data: any
}

export interface IListResponse extends IResponse {
  data: {
    totalPage: number
    currentPage: number
    rows: any[]
  }
}
