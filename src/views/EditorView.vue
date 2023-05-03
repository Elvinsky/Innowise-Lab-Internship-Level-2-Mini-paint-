<template>
  <section>
    <HeaderComponent>{{ username }}</HeaderComponent>
    <div class="editor-wrapper">
      <ToolBar />
      <canvas
        id="canvas"
        @mousedown="
          startDrawing($event);
          startLineDrawing($event);
        "
        @mousemove="draw"
        @mouseup="
          stopDrawing();
          stopLineDrawing($event);
        "
        @mouseout="stopDrawing()"
      ></canvas>
    </div>
    <FooterComponent></FooterComponent>
  </section>
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { Ref, ref, nextTick, reactive } from "vue";
import {
  CanvasCompos,
  CanvasContextCompos,
  CanvasFlagCompos,
  CanvasSizes,
  LineCoords,
} from "@/types/interfaces";
import { useCanvasFlag } from "@/composables/useCanvasFlags";
import { useCanvas, useCanvasContext } from "@/composables/useCanvasContext";
import { drawFigure, freeDraw } from "@/scripts/utils/canvasDrawUtil";
import ToolBar from "@/components/ToolBar.vue";

const username: Ref<string | null> = ref(null);
const flag: CanvasFlagCompos = useCanvasFlag();
const canvas: CanvasCompos = useCanvas();
const ctx: CanvasContextCompos = useCanvasContext();
const isDrawing: Ref<boolean> = ref(false);

const sizes: CanvasSizes = reactive({
  width: 1000,
  height: 500,
});
const line: LineCoords = reactive({
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
});

username.value = localStorage.getItem("user")
  ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    JSON.parse(localStorage.getItem("user")!).name
  : null;

(async () => {
  await nextTick(); // Wait for the next tick to ensure the canvas element is mounted
  canvas.setCanvas(document.getElementById("canvas") as HTMLCanvasElement);
  if (canvas.canvas.value) {
    ctx.setCtx(
      canvas.canvas.value.getContext("2d") as CanvasRenderingContext2D
    );
  }
})().then(() => {
  if (canvas.canvas.value) {
    canvas.canvas.value.width = sizes.width;
    canvas.canvas.value.height = sizes.height;
  }
});
function startDrawing(event: MouseEvent) {
  isDrawing.value = true;
  draw(event);
}
function startLineDrawing(event: MouseEvent) {
  if (
    !ctx.ctx.value ||
    !canvas.canvas.value ||
    (flag.flag.value !== "line" &&
      flag.flag.value !== "square" &&
      flag.flag.value !== "arc")
  )
    return;

  const offsetX: number = canvas.canvas.value.offsetLeft;
  const offsetY: number = canvas.canvas.value.offsetTop;

  line.x1 = event.clientX - offsetX;
  line.y1 = event.clientY - offsetY;
}
function stopLineDrawing(event: MouseEvent) {
  if (
    !ctx.ctx.value ||
    !canvas.canvas.value ||
    (flag.flag.value !== "line" &&
      flag.flag.value !== "square" &&
      flag.flag.value !== "arc")
  )
    return;

  const offsetX: number = canvas.canvas.value.offsetLeft;
  const offsetY: number = canvas.canvas.value.offsetTop;

  line.x2 = event.clientX - offsetX;
  line.y2 = event.clientY - offsetY;
  if (flag.flag.value === "line") drawLine(line.x1, line.y1, line.x2, line.y2);
  else if (flag.flag.value === "square")
    drawSquare(line.x1, line.y1, line.x2, line.y2);
  else if (flag.flag.value === "arc")
    drawArc(line.x1, line.y1, line.x2, line.y2);
}
function stopDrawing() {
  isDrawing.value = false;
}
function draw(event: MouseEvent): void {
  if (!isDrawing.value) return;
  else {
    freeDraw(event);
  }
}
function drawLine(x1: number, y1: number, x2: number, y2: number): void {
  drawFigure(x1, y1, x2, y2);
}
function drawSquare(x1: number, y1: number, x2: number, y2: number): void {
  drawFigure(x1, y1, x2, y2);
}
function drawArc(x1: number, y1: number, x2: number, y2: number): void {
  drawFigure(x1, y1, x2, y2);
}
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.editor-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1em;
}

canvas {
  border: 1px solid black;
  margin-top: 7em;
  background-color: rgba(212, 212, 212, 0.549);
  border-radius: 5px;
  width: 1000px;
  height: 500px;
}
</style>
