import { PaginationInterface } from "@/types/interfaces/composableInterfaces";
import { retrieveCanvas } from "./canvasRetrieveUtil";
import { useImages } from "@/composables/useImages";
import { useToast } from "@/composables/useToast";

const photo: PaginationInterface = useImages();
const toast = useToast();

export const fetchCanvasesByCreator = async (
  page: number,
  limit: number,
  filter?: string[]
): Promise<number> => {
  try {
    const canvases = await retrieveCanvas(page, limit, filter);
    photo.setCanvases(canvases);
    const pageCount = canvases.length / limit;
    return pageCount;
  } catch (error) {
    toast.showToast("error");
    return 0;
  }
};
