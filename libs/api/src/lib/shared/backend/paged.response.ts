export interface PagedResponse<T> {
  currentPageNo: number;
  data: Array<T>;
  totalPages: number;
  totalRecords: number;
}
