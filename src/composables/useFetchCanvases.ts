import { storage } from "@/firebase";
import { Ref, ref as reactiveRef } from "vue";
import {
  getDownloadURL,
  getMetadata,
  list,
  listAll,
  ref,
} from "@firebase/storage";
import { Photo } from "@/types/interfaces/photoInterface";

const photos: Ref<Photo[]> = reactiveRef([]);
export const useFetchCanvasesLimited = () => {
  const storageRef = ref(storage, "gs://innowise-paint-98316.appspot.com");
  const limit = 12; // Set the limit to 12 (3 rows, 4 canvases)
  list(storageRef, { maxResults: limit })
    .then((res) => {
      return Promise.all(
        res.items.map(async (itemRef) => {
          const downloadUrl = await getDownloadURL(itemRef);
          const metadata = await getMetadata(itemRef);
          return {
            downloadUrl,
            name: itemRef.name,
            metadata: {
              uploadedBy: metadata.customMetadata?.uploadedBy ?? "",
              uploadedAt: metadata.customMetadata?.uploadedAt ?? "",
            },
          };
        })
      );
    })
    .then((data) => {
      photos.value = data;
      console.log(photos.value);
    })
    .catch((error) => {
      console.log(error);
    });
  return photos;
};
export const useFetchCanvases = () => {
  const storageRef = ref(storage, "gs://innowise-paint-98316.appspot.com");
  listAll(storageRef)
    .then((res) => {
      return Promise.all(
        res.items.map(async (itemRef) => {
          const downloadUrl = await getDownloadURL(itemRef);
          const metadata = await getMetadata(itemRef);
          return {
            downloadUrl,
            name: itemRef.name,
            metadata: {
              uploadedBy: metadata.customMetadata?.uploadedBy ?? "",
              uploadedAt: metadata.customMetadata?.uploadedAt ?? "",
            },
          };
        })
      );
    })
    .then((data) => {
      photos.value = data;
      console.log(photos.value);
    })
    .catch((error) => {
      console.log(error);
    });
  return photos;
};
