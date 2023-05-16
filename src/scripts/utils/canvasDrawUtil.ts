import { useCanvas } from "@/composables/useCanvas";
import { CanvasCompos } from "@/types/interfaces/composInterfaces";
import { Ref, ref } from "vue";

const canvas: CanvasCompos = useCanvas();

const coord = ref({ x: 0, y: 0 });
const isDrawing: Ref<boolean> = ref(false);
const drawnElements: ImageData[] = [];
export const clearCanvas = (): void => {
  if (canvas.canvas.value && canvas.ctx.value) {
    canvas.ctx.value.clearRect(
      0,
      0,
      canvas.canvas.value.width,
      canvas.canvas.value.height
    );
  }
};
export const start = (event: MouseEvent) => {
  if (!canvas.canvas.value) return;
  isDrawing.value = true;
  reposition(event);
};
export const stop = (event: MouseEvent) => {
  if (!canvas.ctx.value || !isDrawing.value || !canvas.canvas.value) return;

  if (canvas.flag.value === "line") {
    drawLine(event);
  } else if (canvas.flag.value === "square") {
    drawSquare(event);
  } else if (canvas.flag.value === "arc") {
    drawArc(event);
  }
  drawnElements.push(
    canvas.ctx.value.getImageData(
      0,
      0,
      canvas.canvas.value.width,
      canvas.canvas.value.height
    )
  );
  isDrawing.value = false;
};
export const reposition = (event: MouseEvent) => {
  if (!canvas.canvas.value) return;
  coord.value.x = event.clientX - canvas.canvas.value?.offsetLeft;
  coord.value.y = event.clientY - canvas.canvas.value?.offsetTop;
};
export const draw = (event: MouseEvent) => {
  if (!canvas.ctx.value) return;
  canvas.ctx.value.lineWidth = canvas.penWidth.value;
  canvas.ctx.value.lineCap = "round";
  canvas.ctx.value.strokeStyle = canvas.penColor.value;
  if (canvas.flag.value === "draw" && isDrawing.value) {
    canvas.ctx.value.beginPath();
    canvas.ctx.value.moveTo(coord.value.x, coord.value.y);
    reposition(event);
    canvas.ctx.value.lineTo(coord.value.x, coord.value.y);
    canvas.ctx.value.stroke();
  }
};
const drawLine = (event: MouseEvent) => {
  if (!canvas.ctx.value) return;
  canvas.ctx.value.beginPath();
  canvas.ctx.value.moveTo(coord.value.x, coord.value.y);
  reposition(event);
  canvas.ctx.value.lineTo(coord.value.x, coord.value.y);
  canvas.ctx.value.stroke();
};
const drawSquare = (event: MouseEvent) => {
  if (!canvas.ctx.value) return;
  canvas.ctx.value.beginPath();
  const tmpcoords = [coord.value.x, coord.value.y];
  reposition(event);
  canvas.ctx.value.rect(
    tmpcoords[0],
    tmpcoords[1],
    coord.value.x - tmpcoords[0],
    coord.value.y - tmpcoords[1]
  );
  canvas.ctx.value.stroke();
};
const drawArc = (event: MouseEvent) => {
  if (!canvas.ctx.value) return;
  canvas.ctx.value.beginPath();
  const tmpcoords = [coord.value.x, coord.value.y];
  reposition(event);
  canvas.ctx.value.arc(
    tmpcoords[0],
    tmpcoords[1],
    Math.sqrt(
      (coord.value.x - tmpcoords[0]) ** 2 + (coord.value.y - tmpcoords[1]) ** 2
    ),
    0,
    2 * Math.PI
  );
  canvas.ctx.value.stroke();
};
export const cancelLastAction = () => {
  if (!canvas.ctx.value || !canvas.canvas.value) return;
  if (drawnElements.length > 0) {
    canvas.ctx.value.clearRect(
      0,
      0,
      canvas.canvas.value.width,
      canvas.canvas.value.height
    );
    drawnElements.pop();
    for (const element of drawnElements) {
      canvas.ctx.value.putImageData(element, 0, 0);
    }
  }
};
