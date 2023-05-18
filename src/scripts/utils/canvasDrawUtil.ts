import { useCanvas } from "@/composables/useCanvas";
import { CanvasCompos } from "@/types/interfaces/composInterfaces";
import { Ref, ref } from "vue";

const canvas: CanvasCompos = useCanvas();

const coord = ref({ x: 0, y: 0 });
const isDrawing: Ref<boolean> = ref(false);
const drawnElements: Ref<ImageData[]> = ref([]);
const initCoords = { x: 0, y: 0 };
const initData: Ref<string> = ref("");

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
  saveInitContext();
  isDrawing.value = true;
  initCoords.x = event.clientX - canvas.canvas.value?.offsetLeft;
  initCoords.y = event.clientY - canvas.canvas.value?.offsetTop;
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
  } else if (canvas.flag.value === "star") {
    drawStar(event);
  }
  drawnElements.value.push(
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
  } else if (canvas.flag.value === "line" && isDrawing.value) {
    loadInitContext();
    drawLine(event);
  } else if (canvas.flag.value === "square" && isDrawing.value) {
    loadInitContext();
    drawSquare(event);
  } else if (canvas.flag.value === "arc" && isDrawing.value) {
    loadInitContext();
    drawArc(event);
  } else if (canvas.flag.value === "star" && isDrawing.value) {
    loadInitContext();
    drawStar(event);
  }
};

const drawLine = (event: MouseEvent) => {
  if (!canvas.ctx.value) return;
  canvas.ctx.value.beginPath();
  canvas.ctx.value.moveTo(initCoords.x, initCoords.y);
  reposition(event);
  canvas.ctx.value.lineTo(coord.value.x, coord.value.y);
  canvas.ctx.value.stroke();
};

const drawSquare = (event: MouseEvent) => {
  if (!canvas.ctx.value) return;
  canvas.ctx.value.beginPath();
  reposition(event);
  canvas.ctx.value.rect(
    initCoords.x,
    initCoords.y,
    coord.value.x - initCoords.x,
    coord.value.y - initCoords.y
  );
  canvas.ctx.value.stroke();
};

const drawArc = (event: MouseEvent) => {
  if (!canvas.ctx.value) return;
  canvas.ctx.value.beginPath();
  reposition(event);
  canvas.ctx.value.arc(
    initCoords.x,
    initCoords.y,
    Math.sqrt(
      (coord.value.x - initCoords.x) ** 2 + (coord.value.y - initCoords.y) ** 2
    ),
    0,
    2 * Math.PI
  );
  canvas.ctx.value.stroke();
};
const drawStar = (event: MouseEvent) => {
  if (!canvas.ctx.value) return;
  canvas.ctx.value.beginPath();
  reposition(event);
  const radius = Math.min(
    Math.abs(coord.value.x - initCoords.x),
    Math.abs(coord.value.y - initCoords.y)
  );
  const outerRad = radius;
  const innerRad = radius / 2;
  const rotation = (Math.PI / 2) * 3;
  const x = initCoords.x + radius;
  const y = initCoords.y + radius;
  canvas.ctx.value.moveTo(x, y - outerRad);
  for (let i = 0; i < 7; i++) {
    let angle = rotation + (i * Math.PI) / 3;
    const outerX = x + Math.cos(angle) * outerRad;
    const outerY = y + Math.sin(angle) * outerRad;
    canvas.ctx.value.lineTo(outerX, outerY);
    angle += Math.PI / 6;
    const innerX = x + Math.cos(angle) * innerRad;
    const innerY = y + Math.sin(angle) * innerRad;
    canvas.ctx.value.lineTo(innerX, innerY);
  }
  canvas.ctx.value.lineTo(x, y - outerRad);
  canvas.ctx.value.closePath();
  canvas.ctx.value.stroke();
};
export const cancelLastAction = () => {
  if (!canvas.ctx.value || !canvas.canvas.value) return;
  if (drawnElements.value.length > 0) {
    canvas.ctx.value.clearRect(
      0,
      0,
      canvas.canvas.value.width,
      canvas.canvas.value.height
    );
    drawnElements.value.pop();
    for (const element of drawnElements.value) {
      canvas.ctx.value.putImageData(element, 0, 0);
    }
  }
};
const saveInitContext = () => {
  if (canvas.canvas.value) initData.value = canvas.canvas.value.toDataURL();
};
const loadInitContext = () => {
  const image = new Image();
  image.src = initData.value as string;
  image.onload = () => {
    clearCanvas();
    if (canvas.ctx.value) canvas.ctx.value.drawImage(image, 0, 0);
  };
};
export { drawnElements };
