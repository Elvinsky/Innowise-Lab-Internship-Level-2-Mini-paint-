import { useCanvas, useCanvasContext } from "@/composables/useCanvasContext";
import { useCanvasFlag } from "@/composables/useCanvasFlags";
import { useDrawingStyle } from "@/composables/useDrawingStyle";
import { useLineCoords } from "@/composables/useLineCoords";
import {
  CanvasCompos,
  CanvasContextCompos,
  DrawingStyleCompos,
  CanvasFlagCompos,
  LineInterface,
} from "@/types/interfaces/composInterfaces";

const canvas: CanvasCompos = useCanvas();
const ctx: CanvasContextCompos = useCanvasContext();
const drawStyle: DrawingStyleCompos = useDrawingStyle();
const flag: CanvasFlagCompos = useCanvasFlag();
const line: LineInterface = useLineCoords();
export const drawFigure = () => {
  if (!ctx.ctx.value || !canvas.canvas.value) return;
  switch (flag.flag.value) {
    case "line": {
      ctx.ctx.value.lineWidth = drawStyle.penWidth.value;
      ctx.ctx.value.lineCap = "round";
      ctx.ctx.value.strokeStyle = drawStyle.penColor.value;
      ctx.ctx.value.beginPath();
      ctx.ctx.value.moveTo(line.line.value.x1, line.line.value.y1);
      ctx.ctx.value.lineTo(line.line.value.x2, line.line.value.y2);
      ctx.ctx.value.stroke();
      break;
    }
    case "square": {
      ctx.ctx.value.lineWidth = drawStyle.penWidth.value;
      ctx.ctx.value.lineCap = "round";
      ctx.ctx.value.strokeStyle = drawStyle.penColor.value;
      ctx.ctx.value.beginPath();
      ctx.ctx.value.rect(
        line.line.value.x1,
        line.line.value.y1,
        line.line.value.x2 - line.line.value.x1,
        line.line.value.y2 - line.line.value.y1
      );
      ctx.ctx.value.stroke();
      break;
    }
    case "arc": {
      ctx.ctx.value.lineWidth = drawStyle.penWidth.value;
      ctx.ctx.value.lineCap = "round";
      ctx.ctx.value.strokeStyle = drawStyle.penColor.value;
      ctx.ctx.value.beginPath();
      ctx.ctx.value.arc(
        line.line.value.x1,
        line.line.value.y1,
        Math.sqrt(
          (line.line.value.x2 - line.line.value.x1) ** 2 +
            (line.line.value.y2 - line.line.value.y1) ** 2
        ),
        0,
        2 * Math.PI
      );
      ctx.ctx.value.stroke();
      break;
    }
  }
};
export const freeDraw = (event: MouseEvent) => {
  if (!ctx.ctx.value || !canvas.canvas.value) return;
  if (flag.flag.value !== "draw") return;
  const offsetX: number = canvas.canvas.value.offsetLeft;
  const offsetY: number = canvas.canvas.value.offsetTop;
  const x: number = event.clientX - offsetX;
  const y: number = event.clientY - offsetY;
  ctx.ctx.value.lineWidth = drawStyle.penWidth.value;
  ctx.ctx.value.lineCap = "round";
  ctx.ctx.value.strokeStyle = drawStyle.penColor.value;
  ctx.ctx.value.beginPath();
  ctx.ctx.value.moveTo(x, y);
  ctx.ctx.value.lineTo(x, y);
  ctx.ctx.value.stroke();
};
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
