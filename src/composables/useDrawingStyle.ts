import { DrawingStyleCompos } from "@/types/interfaces";
import { Ref, ref } from "vue";
const penWidth: Ref<number> = ref(5);
const penColor: Ref<string> = ref("black");
export const useDrawingStyle = (): DrawingStyleCompos => {
  const setWidth = (param: number): void => {
    penWidth.value = param;
  };
  const setColor = (param: string): void => {
    penColor.value = param;
  };
  return { penWidth, penColor, setWidth, setColor };
};
