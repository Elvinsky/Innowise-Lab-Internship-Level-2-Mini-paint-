import { Photo } from "./photoInterface";

export interface PaginationResponse {
  data: Photo[];
  nextPageToken: string;
}
