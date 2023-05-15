import { storage } from "@/firebase";
import {
  ListResult,
  getDownloadURL,
  getMetadata,
  list,
  ref,
} from "@firebase/storage";
export const useFetchCanvases = async (pageSize: number, pageToken: string) => {
  const storageRef = ref(storage, "gs://innowise-paint-98316.appspot.com");
  const options = pageToken
    ? { maxResults: pageSize, pageToken }
    : { maxResults: pageSize };
  return list(storageRef, options)
    .then(async (res: ListResult) => {
      const items = res.items || [];
      const promises = items.map(async (itemRef) => {
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
      });
      const data = await Promise.all(promises);
      const nextPageToken = res.nextPageToken;
      return { data, nextPageToken };
    })
    .catch((error) => {
      console.error(error);
    });
};
