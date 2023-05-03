<template>
  <section>
    <HeaderComponent>{{ username }}</HeaderComponent>
    <div class="editor-wrapper">
      <div class="actions">
        <img
          src="@/assets/pen.png"
          class="main-img"
          alt="pen"
          @click="handleDrawFlag"
          :class="flag.flag.value === 'draw' ? 'active' : ''"
        />
        <div>
          <img
            src="@/assets/width.png"
            class="main-img"
            alt="width"
            @click="showWidthRange"
          />
          <input
            type="range"
            min="1"
            max="120"
            step="1"
            class="width-range"
            @change="handleWidthChange"
            v-model="drawStyle.penWidth.value"
            v-if="widthRange"
          />
        </div>
        <div
          class="color-circle"
          :style="{ backgroundColor: drawStyle.penColor.value }"
          @click="showColorPick"
        />
        <input
          type="color"
          class="color-pick"
          @input="handleColorPick"
          v-if="colorPick"
          v-model="drawStyle.penColor.value"
        />
        <img
          src="@/assets/straight-line.png"
          alt="line"
          @click="handleLineFlag"
          class="main-img"
          :class="flag.flag.value === 'line' ? 'active' : ''"
        />
        <img
          src="@/assets/square.png"
          alt="square"
          @click="handleSquareFlag"
          class="main-img"
          :class="flag.flag.value === 'square' ? 'active' : ''"
        />
        <img
          src="@/assets/circle.png"
          alt="circle"
          @click="handleArcFlag"
          class="main-img"
          :class="flag.flag.value === 'arc' ? 'active' : ''"
        />
        <img
          src="@/assets/refresh-arrow.png"
          class="main-img"
          @click="handleClearCanvas"
        />
      </div>

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
  DrawingStyleCompos,
  LineCoords,
} from "@/types/interfaces";
import { useCanvasFlag } from "@/composables/useCanvasFlags";
import { useCanvas, useCanvasContext } from "@/composables/useCanvasContext";
import { useDrawingStyle } from "@/composables/useDrawingStyle";
import {
  clearCanvas,
  drawFigure,
  freeDraw,
} from "@/scripts/utils/canvasDrawUtil";

const username: Ref<string | null> = ref(null);
const flag: CanvasFlagCompos = useCanvasFlag();
const canvas: CanvasCompos = useCanvas();
const ctx: CanvasContextCompos = useCanvasContext();
const drawStyle: DrawingStyleCompos = useDrawingStyle();
const isDrawing: Ref<boolean> = ref(false);
const widthRange: Ref<boolean> = ref(false);
const colorPick: Ref<boolean> = ref(false);
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

function showWidthRange(): void {
  widthRange.value = !widthRange.value;
  colorPick.value = false;
}
function showColorPick(): void {
  colorPick.value = !colorPick.value;
  widthRange.value = false;
}
function handleDrawFlag(): void {
  flag.flag.value === "draw" ? flag.setFlag("") : flag.setFlag("draw");
}
function handleLineFlag(): void {
  flag.flag.value === "line" ? flag.setFlag("") : flag.setFlag("line");
}
function handleSquareFlag(): void {
  flag.flag.value === "square" ? flag.setFlag("") : flag.setFlag("square");
}
function handleArcFlag(): void {
  flag.flag.value === "arc" ? flag.setFlag("") : flag.setFlag("arc");
}
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
function handleWidthChange(event: InputEvent): void {
  drawStyle.setWidth((event.target as HTMLInputElement).valueAsNumber);
}
function handleClearCanvas(): void {
  clearCanvas();
}
const handleColorPick = (event: InputEvent) => {
  console.log((event.target as HTMLInputElement).value);
  drawStyle.setColor((event.target as HTMLInputElement).value);
};
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
.width-range {
  position: absolute;
  left: 140px;
  transform: rotate(-90deg);
}
.color-pick {
  position: absolute;
  left: 140px;
  top: 300px;
  width: 60px;
  height: 60px;
}
.actions {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.7em;
}
.active {
  background-color: rgba(0, 255, 0, 0.44);
}
.action-blocked {
  display: flex;
  align-items: center;
  align-content: center;
  gap: 1em;
}
.color-circle {
  border-radius: 50%;
  width: 25px;
  height: 25px;
  border: 1px solid rgba(0, 0, 0, 0.342);
  cursor: pointer;
  transition: all;
  transition-duration: 200ms;
}
.color-circle:hover {
  transform: scale(1.1);
}
.sideblock {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
}
.main-img {
  width: 25px;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.4em;
  transition: all;
  transition-duration: 200ms;
}
.main-img:hover {
  transform: scale(1.1);
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
