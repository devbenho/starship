
//TODO: Make it a generic class with Repository<T> to fill metadata about the returned data
class PaginatedList<T> {

  private items: T[];

  private pageSize: number;

  private pageNumber: number;

  private totalPages: number;

  private totalCount: number;

  private readonly hasNextPage: boolean;

  private readonly hasPreviousPage: boolean;

  public constructor(
    {
      items,
      pageSize,
      pageNumber,
      totalPages,
      totalCount,
    }: {
       items: T[]
      pageSize: number;
      pageNumber: number;
      totalPages: number;
      totalCount: number;
    },
  ) {
    this.items = items;
    this.pageNumber = pageNumber;
    this.totalPages = totalPages;
    this.totalCount = totalCount;

    this.hasPreviousPage = pageNumber > 1;
    this.hasNextPage = pageNumber < totalPages;
  }
}

export { PaginatedList };