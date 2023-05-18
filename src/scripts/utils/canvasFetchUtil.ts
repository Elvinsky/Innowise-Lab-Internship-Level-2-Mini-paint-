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
// export const fetchPaginatedCanvases = async (
//   pageSize: number,
//   pageToken?: string
// ) => {
//   const storageRef = ref(storage, "gs://innowise-paint-98316.appspot.com");
//   const options = pageToken
//     ? { maxResults: pageSize, pageToken }
//     : { maxResults: pageSize };
//   return list(storageRef, options)
//     .then(async (res: ListResult) => {
//       const items = res.items || [];
//       const promises = items.map(async (itemRef) => {
//         const downloadUrl = await getDownloadURL(itemRef);
//         const metadata = await getMetadata(itemRef);
//         return {
//           downloadUrl,
//           name: itemRef.name,
//           metadata: {
//             uploadedBy: metadata.customMetadata?.uploadedBy ?? "",
//             uploadedAt: metadata.customMetadata?.uploadedAt ?? "",
//             canvasCtx: metadata.customMetadata?.canvasCtx ?? "",
//           },
//         };
//       });
//       const data = await Promise.all(promises);
//       const nextPageToken = res.nextPageToken;
//       const sortedData = data.sort(
//         (a: Photo, b: Photo) =>
//           Number(a.metadata.uploadedAt) - Number(b.metadata.uploadedAt)
//       );
//       photo.setCanvases(sortedData);
//       photo.setToken(nextPageToken as string);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
export const fetchCanvasesByCreator = async (filter?: string[]) => {
  const storageRef = ref(storage, "gs://innowise-paint-98316.appspot.com");

  return listAll(storageRef)
    .then(async (res: ListResult) => {
      const items = res.items || [];
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
      photo.setCanvases(dataToSet as Photo[]);
    })
    .catch((error) => {
      console.error(error);
    });
};
