import { DrawStyle, DrawingStyleCompos } from "@/types/interfaces";
import { Ref, reactive, ref } from "vue";

export const useDrawingStyle = (): DrawingStyleCompos => {
  const penWidth: Ref<number> = ref(5);
  const penColor: Ref<string> = ref("black");
  const setWidth = (param: number): void => {
    penWidth.value = param;
  };
  const setColor = (param: string): void => {
    penColor.value = param;
  };
  return { penWidth, penColor, setWidth, setColor };
};
