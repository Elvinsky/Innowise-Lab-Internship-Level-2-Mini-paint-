import { CanvasComposable } from "@/types/interfaces/composableInterfaces";
import { CanvasFlag } from "@/types/literals/literals";
import { ref, Ref } from "vue";

const canvas: Ref<HTMLCanvasElement | null> = ref(null);
const ctx: Ref<CanvasRenderingContext2D | null> = ref(null);
const flag: Ref<CanvasFlag> = ref("");
const penWidth: Ref<number> = ref(5);
const penColor: Ref<string> = ref("black");

export const useCanvas = (): CanvasComposable => {
  const setCanvas = (canvasVal: HTMLCanvasElement) => {
    canvas.value = canvasVal;
  };
  const setCtx = (contextVal: CanvasRenderingContext2D) => {
    ctx.value = contextVal;
  };
  const setFlag = (flagVal: CanvasFlag): void => {
    flag.value = flagVal;
  };
  const setPenWidth = (param: number): void => {
    penWidth.value = param;
  };
  const setPenColor = (param: string): void => {
    penColor.value = param;
  };
  return {
    canvas,
    setCanvas,
    ctx,
    setCtx,
    flag,
    setFlag,
    penWidth,
    setPenWidth,
    penColor,
    setPenColor,
  };
};
