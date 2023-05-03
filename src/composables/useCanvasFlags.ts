import { Ref, ref } from "vue";
import { CanvasFlag } from "@/types/literals";
import { CanvasFlagCompos } from "@/types/interfaces";
const flag: Ref<CanvasFlag> = ref("");
export const useCanvasFlag = (): CanvasFlagCompos => {
  const setFlag = (flagVal: CanvasFlag): void => {
    flag.value = flagVal;
  };
  return { flag, setFlag };
};
