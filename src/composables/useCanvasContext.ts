import {
  CanvasCompos,
  CanvasContextCompos,
} from "@/types/interfaces/composInterfaces";
import { ref, Ref } from "vue";

const ctx: Ref<CanvasRenderingContext2D | null> = ref(null);

export const useCanvasContext = (): CanvasContextCompos => {
  const setCtx = (contextVal: CanvasRenderingContext2D) => {
    ctx.value = contextVal;
  };
  return { ctx, setCtx };
};
