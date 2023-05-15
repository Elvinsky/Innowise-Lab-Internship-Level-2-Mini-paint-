import { ListOptions } from "@firebase/storage";

export interface PaginationListOptions extends ListOptions {
  prevPageToken?: string;
}
