import { CanvasCompos } from "@/types/interfaces/composInterfaces";
import { ref, Ref } from "vue";

const canvas: Ref<HTMLCanvasElement | null> = ref(null);

export const useCanvas = (): CanvasCompos => {
  const setCanvas = (canvasVal: HTMLCanvasElement) => {
    canvas.value = canvasVal;
  };
  return { canvas, setCanvas };
};
