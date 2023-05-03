import { CanvasCompos, CanvasContextCompos } from "@/types/interfaces";
import { ref, Ref } from "vue";

export const useCanvas = (): CanvasCompos => {
  const canvas: Ref<HTMLCanvasElement | null> = ref(null);
  const setCanvas = (canvasVal: HTMLCanvasElement) => {
    canvas.value = canvasVal;
  };
  return { canvas, setCanvas };
};
export const useCanvasContext = (): CanvasContextCompos => {
  const ctx: Ref<CanvasRenderingContext2D | null> = ref(null);
  const setCtx = (contextVal: CanvasRenderingContext2D) => {
    ctx.value = contextVal;
  };
  return { ctx, setCtx };
};
