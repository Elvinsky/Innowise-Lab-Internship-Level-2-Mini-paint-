import { ImagesComposableInterface } from "@/types/interfaces/composableInterfaces";
import { Photo } from "@/types/interfaces/photoInterface";
import { ref as reactiveRef, Ref } from "vue";

const images: Ref<Photo[] | null> = reactiveRef(null);
const currentImageData: Ref<string | null> = reactiveRef("");
const limit: Ref<number> = reactiveRef(0);
const page: Ref<number> = reactiveRef(1);
const totalPages: Ref<number> = reactiveRef(0);

export const useImages = (): ImagesComposableInterface => {
  const setImages = (photo: Photo[]) => {
    images.value = photo;
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
  const setCurrentImageData = (value: string | null) => {
    currentImageData.value = value;
  };
  return {
    images,
    setImages,
    limit,
    setLimit,
    page,
    setPage,
    totalPages,
    setTotalPages,
    currentImageData,
    setCurrentImageData,
  };
};
