import { Ref, ref } from "vue";
import { CanvasFlag } from "@/types/literals";
import { CanvasFlagCompos } from "@/types/interfaces";
export const useCanvasFlag = (): CanvasFlagCompos => {
  const flag: Ref<CanvasFlag> = ref("");
  const setFlag = (flagVal: CanvasFlag): void => {
    flag.value = flagVal;
  };
  return { flag, setFlag };
};
