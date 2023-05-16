import { useCanvas } from "@/composables/useCanvas";
import { useCanvasContext } from "@/composables/useCanvasContext";
import { useCanvasFlag } from "@/composables/useCanvasFlags";
import { useDrawingStyle } from "@/composables/useDrawingStyle";
import {
  CanvasCompos,
  CanvasContextCompos,
  DrawingStyleCompos,
  CanvasFlagCompos,
} from "@/types/interfaces/composInterfaces";
import { Ref, ref } from "vue";

const canvas: CanvasCompos = useCanvas();
const ctx: CanvasContextCompos = useCanvasContext();
const drawStyle: DrawingStyleCompos = useDrawingStyle();
const flag: CanvasFlagCompos = useCanvasFlag();
const coord = ref({ x: 0, y: 0 });
const isDrawing: Ref<boolean> = ref(false);

export const clearCanvas = (): void => {
  const canvas: CanvasCompos = useCanvas();
  const ctx: CanvasContextCompos = useCanvasContext();
  if (canvas.canvas.value && ctx.ctx.value) {
    ctx.ctx.value.clearRect(
      0,
      0,
      canvas.canvas.value.width,
      canvas.canvas.value.height
    );
  }
};
export const start = (event: MouseEvent) => {
  isDrawing.value = true;
  reposition(event);
};
export const stop = (event: MouseEvent) => {
  if (!ctx.ctx.value || !isDrawing.value) return;

  if (flag.flag.value === "line") {
    drawLine(event);
  } else if (flag.flag.value === "square") {
    drawSquare(event);
  } else if (flag.flag.value === "arc") {
    drawArc(event);
  }
  isDrawing.value = false;
};
export const reposition = (event: MouseEvent) => {
  if (!canvas.canvas.value) return;
  coord.value.x = event.clientX - canvas.canvas.value?.offsetLeft;
  coord.value.y = event.clientY - canvas.canvas.value?.offsetTop;
};
export const draw = (event: MouseEvent) => {
  if (!ctx.ctx.value) return;
  ctx.ctx.value.lineWidth = drawStyle.penWidth.value;
  ctx.ctx.value.lineCap = "round";
  ctx.ctx.value.strokeStyle = drawStyle.penColor.value;
  if (flag.flag.value === "draw" && isDrawing.value) {
    ctx.ctx.value.beginPath();
    ctx.ctx.value.moveTo(coord.value.x, coord.value.y);
    reposition(event);
    ctx.ctx.value.lineTo(coord.value.x, coord.value.y);
    ctx.ctx.value.stroke();
  }
};
const drawLine = (event: MouseEvent) => {
  if (!ctx.ctx.value) return;
  ctx.ctx.value.beginPath();
  ctx.ctx.value.moveTo(coord.value.x, coord.value.y);
  reposition(event);
  ctx.ctx.value.lineTo(coord.value.x, coord.value.y);
  ctx.ctx.value.stroke();
};
const drawSquare = (event: MouseEvent) => {
  if (!ctx.ctx.value) return;
  ctx.ctx.value.beginPath();
  const tmpcoords = [coord.value.x, coord.value.y];
  reposition(event);
  ctx.ctx.value.rect(
    tmpcoords[0],
    tmpcoords[1],
    coord.value.x - tmpcoords[0],
    coord.value.y - tmpcoords[1]
  );
  ctx.ctx.value.stroke();
};
const drawArc = (event: MouseEvent) => {
  if (!ctx.ctx.value) return;
  ctx.ctx.value.beginPath();
  const tmpcoords = [coord.value.x, coord.value.y];
  reposition(event);
  ctx.ctx.value.arc(
    tmpcoords[0],
    tmpcoords[1],
    Math.sqrt(
      (coord.value.x - tmpcoords[0]) ** 2 + (coord.value.y - tmpcoords[1]) ** 2
    ),
    0,
    2 * Math.PI
  );
  ctx.ctx.value.stroke();
};
