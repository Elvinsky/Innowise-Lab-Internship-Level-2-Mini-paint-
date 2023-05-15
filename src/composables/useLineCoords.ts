import { LineCoords } from "@/types/interfaces/canvasInterfaces";
import { ref, Ref } from "vue";
const line: Ref<LineCoords> = ref({
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
});
export const useLineCoords = () => {
  const setX1 = (x1: number) => {
    line.value.x1 = x1;
  };
  const setX2 = (x2: number) => {
    line.value.x2 = x2;
  };
  const setY1 = (y1: number) => {
    line.value.y1 = y1;
  };
  const setY2 = (y2: number) => {
    line.value.y2 = y2;
  };
  return { line, setX1, setX2, setY1, setY2 };
};
