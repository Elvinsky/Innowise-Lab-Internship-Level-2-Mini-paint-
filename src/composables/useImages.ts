import { Photo } from "@/types/interfaces/photoInterface";
import { ref as reactiveRef, Ref } from "vue";

const photos: Ref<Photo[] | null> = reactiveRef(null);
const pageTokenRef: Ref<string> = reactiveRef("");

export const useImages = () => {
  const setCanvases = (photo: Photo[]) => {
    photos.value = photo;
  };
  const setToken = (token: string) => {
    pageTokenRef.value = token;
  };

  return { photos, pageTokenRef, setCanvases, setToken };
};
