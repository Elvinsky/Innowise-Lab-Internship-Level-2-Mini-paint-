import { useImages } from "@/composables/useImages";
import { storage } from "@/firebase";
import { PaginationInterface } from "@/types/interfaces/composInterfaces";
import { Photo } from "@/types/interfaces/photoInterface";
import {
  ListResult,
  getDownloadURL,
  getMetadata,
  listAll,
  ref,
} from "@firebase/storage";
const photo: PaginationInterface = useImages();
export const fetchCanvasesByCreator = async (
  page: number,
  limit: number,
  filter?: string[]
) => {
  const storageRef = ref(storage, "gs://innowise-paint-98316.appspot.com");

  return listAll(storageRef)
    .then(async (res: ListResult) => {
      const items = res.items || [];
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const pageCount = items.length / limit;
      const promises = items.map(async (itemRef) => {
        const downloadUrl = await getDownloadURL(itemRef);
        const metadata = await getMetadata(itemRef);
        if (filter) {
          if (
            metadata.customMetadata &&
            filter?.includes(metadata.customMetadata?.uploadedAt)
          ) {
            return {
              downloadUrl,
              name: itemRef.name,
              metadata: {
                uploadedBy: metadata.customMetadata?.uploadedBy ?? "",
                uploadedAt: metadata.customMetadata?.uploadedAt ?? "",
                canvasCtx: metadata.customMetadata?.canvasCtx ?? "",
              },
            };
          }
        } else {
          return {
            downloadUrl,
            name: itemRef.name,
            metadata: {
              uploadedBy: metadata.customMetadata?.uploadedBy ?? "",
              uploadedAt: metadata.customMetadata?.uploadedAt ?? "",
              canvasCtx: metadata.customMetadata?.canvasCtx ?? "",
            },
          };
        }
      });
      const data = await Promise.all(promises);
      const dataToSet = data.filter((el) => el);
      photo.setCanvases(dataToSet.slice(startIndex, endIndex) as Photo[]);
      return pageCount;
    })
    .catch((error) => {
      console.error(error);
    });
};
