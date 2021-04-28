export interface PaginationInputGraphql {
  limit?: number;
  page: number;
}

export interface PaginationDB {
  limit: number;
  offset: number;
}

export interface PaginationResolveGraphql<T> {
  edges?: EdgeType<T>[];
  nodes: T[];
  totalCount: number;
  hasNextPage?: boolean;
}
interface EdgeType<T> {
  cursor: string;
  node: T;
}
