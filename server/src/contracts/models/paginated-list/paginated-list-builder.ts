import {
  PaginatedList,
} from '@/contracts/models/paginated-list/paginated-list';

class PaginatedListBuilder<T> {
  private items: T[];
  private pageSize: number;
  private pageNumber: number;
  private totalPages: number;
  private totalCount: number;

  public withItems(items: T[]): PaginatedListBuilder<T> {
    this.items = items;
    return this;
  }

  public withPageSize(pageSize: number): PaginatedListBuilder<T> {
    this.pageSize = pageSize;
    return this;
  }

  public withPageNumber(pageNumber: number): PaginatedListBuilder<T> {
    this.pageNumber = pageNumber;
    return this;
  }

  public withTotalCount(totalCount: number): PaginatedListBuilder<T> {
    this.totalCount = totalCount;
    return this;
  }

  public build(): PaginatedList<T> {
    return new PaginatedList<T>({
      items: this.items,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      totalPages: Math.ceil(this.totalCount / this.pageSize),
      totalCount: this.totalCount,
    });
  }
}

export{ PaginatedListBuilder };