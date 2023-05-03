import { CanvasCompos, CanvasContextCompos } from "@/types/interfaces";
import { ref, Ref } from "vue";
const canvas: Ref<HTMLCanvasElement | null> = ref(null);
const ctx: Ref<CanvasRenderingContext2D | null> = ref(null);
const setCanvas = (canvasVal: HTMLCanvasElement) => {
  canvas.value = canvasVal;
};
export const useCanvas = (): CanvasCompos => {
  return { canvas, setCanvas };
};
export const useCanvasContext = (): CanvasContextCompos => {
  const setCtx = (contextVal: CanvasRenderingContext2D) => {
    ctx.value = contextVal;
  };
  return { ctx, setCtx };
};
