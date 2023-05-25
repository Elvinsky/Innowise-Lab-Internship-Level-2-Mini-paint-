import { storage } from "@/firebase";
import {
  ListResult,
  getDownloadURL,
  getMetadata,
  listAll,
  ref,
} from "@firebase/storage";
import { Photo } from "@/types/interfaces/photoInterface";

export const retrieveCanvas = async (
  page: number,
  limit: number,
  filter?: string[]
): Promise<Photo[]> => {
  const storageRef = ref(storage, "gs://innowise-paint-98316.appspot.com");

  try {
    const res: ListResult = await listAll(storageRef);
    const items = res.items || [];
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
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
    return dataToSet.slice(startIndex, endIndex) as Photo[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
