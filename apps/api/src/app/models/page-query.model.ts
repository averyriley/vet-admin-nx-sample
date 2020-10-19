export class PagedQueryModel<T> {
  count: number;
  skip: number;
  limit: number;
  rows: T[] = [];
}
