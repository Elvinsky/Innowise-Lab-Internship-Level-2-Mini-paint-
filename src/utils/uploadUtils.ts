import { useCanvas } from "@/composables/useCanvas";
import { CanvasComposable } from "@/types/interfaces/composableInterfaces";

import { useFirebase } from "@/composables/useFirebase";
const { canvas }: CanvasComposable = useCanvas();
const { firebaseBytesUpload } = useFirebase();
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
  if (!canvas.value) return;
  const dataURL = canvas.value.toDataURL();
  const blob = dataURLtoBlob(dataURL);
  const file = new File([blob], fileName);
  firebaseBytesUpload(file, fileName);
};
