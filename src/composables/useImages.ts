import { Photo } from "@/types/interfaces/photoInterface";
import { ref as reactiveRef, Ref } from "vue";

const photos: Ref<Photo[] | null> = reactiveRef(null);

export const useImages = () => {
  const setCanvases = (photo: Photo[]) => {
    photos.value = photo;
  };

  return { photos, setCanvases };
};
