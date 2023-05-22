import { PaginationInterface } from "@/types/interfaces/composInterfaces";
import { retrieveCanvases } from "./canvasRetrieveUtil";
import { useImages } from "@/composables/useImages";

const photo: PaginationInterface = useImages();

export const fetchCanvasesByCreator = async (
  page: number,
  limit: number,
  filter?: string[]
): Promise<number> => {
  try {
    const canvases = await retrieveCanvases(page, limit, filter);
    photo.setCanvases(canvases);
    const pageCount = canvases.length / limit;
    return pageCount;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
