
export interface PocketbaseResult<T= any> {
  items: T;
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface PocketbaseItem<T = {}> {
  "@collectionId": string;
  "@collectionName": string;
  "@expand": Partial<T>;
  created: string;
  updated: string;
  id: string;
}

export interface Task extends PocketbaseItem {
  description: string;
  isCompleted: boolean;
}
