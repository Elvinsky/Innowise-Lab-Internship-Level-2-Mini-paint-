import { Photo } from "@/types/interfaces/photoInterface";
import { ref as reactiveRef, Ref } from "vue";

const photos: Ref<Photo[] | null> = reactiveRef(null);
const limit: Ref<number> = reactiveRef(0);
const page: Ref<number> = reactiveRef(1);
const totalPages: Ref<number> = reactiveRef(0);
export const useImages = () => {
  const setCanvases = (photo: Photo[]) => {
    photos.value = photo;
  };
  const setLimit = (value: number) => {
    limit.value = value;
  };
  const setPage = (value: number) => {
    page.value = value;
  };
  const setTotalPages = (value: number) => {
    totalPages.value = value;
  };
  return {
    photos,
    setCanvases,
    limit,
    setLimit,
    page,
    setPage,
    totalPages,
    setTotalPages,
  };
};
