import { useCanvas } from "@/composables/useCanvas";
import { useUser } from "@/composables/useUser";
import { storage } from "@/firebase";
import {
  CanvasCompos,
  UserDataCompos,
} from "@/types/interfaces/composInterfaces";
import {
  StorageReference,
  UploadMetadata,
  ref,
  uploadBytes,
} from "firebase/storage";
import { updateItem } from "../dbScripts/crudApi";
const canvas: CanvasCompos = useCanvas();

export function dataURLtoBlob(dataURL: string): Blob {
  const parts = dataURL.split(",");
  const contentType = parts[0].split(":")[1];
  const byteString = atob(parts[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: contentType });
}

export const firebaseUpload = async (fileName: string) => {
  const user: UserDataCompos = useUser();
  const canvasBackup = canvas.canvas.value;
  if (!canvasBackup) return;
  const imageRef: StorageReference = ref(storage, fileName + ".png");
  const dataURL = canvasBackup.toDataURL();
  const blob = dataURLtoBlob(dataURL);
  const file = new File([blob], fileName);
  if (!user.user.value || !canvas.canvas.value) return;
  const metadata: UploadMetadata = {
    customMetadata: {
      uploadedBy: user.user.value.email as string,
      uploadedAt: Math.round(new Date().getTime() / 1000).toString() as string,
      canvasCtx: canvas.canvas.value.toDataURL(),
    },
  };
  if (!metadata.customMetadata) return;
  updateItem("users", user.user.value.uid, metadata.customMetadata.uploadedAt);
  uploadBytes(imageRef, file, metadata);
};
