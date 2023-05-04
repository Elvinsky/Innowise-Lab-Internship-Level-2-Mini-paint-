import { useCanvas } from "@/composables/useCanvasContext";
import { storage } from "@/firebase";
import { CanvasCompos } from "@/types/interfaces/composInterfaces";
import {
  StorageReference,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { Ref } from "vue";

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
export const firebaseUpload = (fileName: string) => {
  const canvasBackup = canvas.canvas.value;
  if (!canvasBackup) return;
  const imageRef: StorageReference = storageRef(storage, fileName + ".png");
  const dataURL = canvasBackup.toDataURL();
  const blob = dataURLtoBlob(dataURL);
  const file = new File([blob], fileName + ".png");
  uploadBytes(imageRef, file).then((snapshot) => {
    console.log("uploaded", snapshot);
  });
};
