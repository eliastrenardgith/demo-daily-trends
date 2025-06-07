export interface IPagination<T> {
  totalPages: number;
  totalCount: number;
  page: number;
  items: T[];
}
