import { getDownloadURL, getMetadata } from "@firebase/storage";
import { Photo } from "@/types/interfaces/photoInterface";
import { useToast } from "@/composables/useToast";
import { useImages } from "@/composables/useImages";
import { useFirebase } from "@/composables/useFirebase";
const toast = useToast();
const images = useImages();
const { firebaseGetAllItems } = useFirebase();
export const retrieveCanvas = async (
  page: number,
  limit: number,
  filter?: string[]
): Promise<Photo[]> => {
  try {
    const res = await firebaseGetAllItems(
      "gs://innowise-paint-userver.appspot.com"
    );
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
    images.setTotalPages(dataToSet.length);
    return dataToSet.slice(startIndex, endIndex) as Photo[];
  } catch (error) {
    toast.showToast("error");
    return [];
  }
};
