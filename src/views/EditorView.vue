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
          :class="drawFlag ? 'active' : ''"
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
            v-model="drawStyle.width"
            v-if="widthRange"
          />
        </div>
        <div
          class="color-circle"
          :style="{ backgroundColor: drawStyle.color }"
          @click="showColorPick"
        />
        <input
          type="color"
          class="color-pick"
          @input="handleColorPick"
          v-if="colorPick"
          v-model="drawStyle.color"
        />
        <img
          src="@/assets/straight-line.png"
          alt="line"
          @click="handleLineFlag"
          class="main-img"
          :class="lineFlag ? 'active' : ''"
        />
        <img
          src="@/assets/square.png"
          alt="square"
          @click="handleSquareFlag"
          class="main-img"
          :class="squareFlag ? 'active' : ''"
        />
        <img
          src="@/assets/circle.png"
          alt="circle"
          @click="handleArcFlag"
          class="main-img"
          :class="arcFlag ? 'active' : ''"
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
import { CanvasSizes, DrawStyle, LineCoords } from "@/types/interfaces";

const username: Ref<string | null> = ref(null);
const canvas: Ref<HTMLCanvasElement | null> = ref(null);
const ctx: Ref<CanvasRenderingContext2D | null> = ref(null);
const isDrawing: Ref<boolean> = ref(false);
const drawFlag: Ref<boolean> = ref(false);
const lineFlag: Ref<boolean> = ref(false);
const squareFlag: Ref<boolean> = ref(false);
const arcFlag: Ref<boolean> = ref(false);
const widthRange: Ref<boolean> = ref(false);
const colorPick: Ref<boolean> = ref(false);

const sizes: CanvasSizes = reactive({
  width: 1000,
  height: 500,
});
const drawStyle: DrawStyle = reactive({
  width: 5,
  color: "black",
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
  canvas.value = document.getElementById("canvas") as HTMLCanvasElement;
  if (canvas.value) {
    ctx.value = canvas.value.getContext("2d") as CanvasRenderingContext2D;
  }
})().then(() => {
  if (canvas.value) {
    canvas.value.width = sizes.width;
    canvas.value.height = sizes.height;
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
  drawFlag.value = !drawFlag.value;
  widthRange.value = false;
  colorPick.value = false;
  lineFlag.value = false;
  squareFlag.value = false;
  arcFlag.value = false;
}
function handleLineFlag(): void {
  lineFlag.value = !lineFlag.value;
  widthRange.value = false;
  colorPick.value = false;
  drawFlag.value = false;
  squareFlag.value = false;
  arcFlag.value = false;
}
function handleSquareFlag(): void {
  squareFlag.value = !squareFlag.value;
  widthRange.value = false;
  colorPick.value = false;
  drawFlag.value = false;
  lineFlag.value = false;
  arcFlag.value = false;
}
function handleArcFlag(): void {
  arcFlag.value = !arcFlag.value;
  widthRange.value = false;
  colorPick.value = false;
  drawFlag.value = false;
  lineFlag.value = false;
  squareFlag.value = false;
}
function startDrawing(event: MouseEvent) {
  isDrawing.value = true;
  draw(event);
}
function startLineDrawing(event: MouseEvent) {
  if (
    !ctx.value ||
    !canvas.value ||
    (!lineFlag.value && !squareFlag.value && !arcFlag.value)
  )
    return;

  const offsetX: number = canvas.value.offsetLeft;
  const offsetY: number = canvas.value.offsetTop;

  line.x1 = event.clientX - offsetX;
  line.y1 = event.clientY - offsetY;
}
function stopLineDrawing(event: MouseEvent) {
  if (
    !ctx.value ||
    !canvas.value ||
    (!lineFlag.value && !squareFlag.value && !arcFlag.value)
  )
    return;

  const offsetX: number = canvas.value.offsetLeft;
  const offsetY: number = canvas.value.offsetTop;

  line.x2 = event.clientX - offsetX;
  line.y2 = event.clientY - offsetY;
  if (lineFlag.value) drawLine(line.x1, line.y1, line.x2, line.y2);
  else if (squareFlag.value) drawSquare(line.x1, line.y1, line.x2, line.y2);
  else {
    drawArc(line.x1, line.y1, line.x2, line.y2);
  }
}
function stopDrawing() {
  isDrawing.value = false;
}
function handleWidthChange(event: InputEvent): void {
  drawStyle.width = (event.target as HTMLInputElement).valueAsNumber;
}
function handleClearCanvas(): void {
  if (canvas.value && ctx.value) {
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  }
}
const handleColorPick = (event: InputEvent) => {
  console.log((event.target as HTMLInputElement).value);
  drawStyle.color = (event.target as HTMLInputElement).value;
};
function draw(event: MouseEvent): void {
  if (!isDrawing.value || !ctx.value || !canvas.value || !drawFlag.value)
    return;

  const offsetX: number = canvas.value.offsetLeft;
  const offsetY: number = canvas.value.offsetTop;

  const x: number = event.clientX - offsetX;
  const y: number = event.clientY - offsetY;

  ctx.value.lineWidth = drawStyle.width;
  ctx.value.lineCap = "round";
  ctx.value.strokeStyle = drawStyle.color;
  ctx.value.beginPath();
  ctx.value.moveTo(x, y);
  ctx.value.lineTo(x, y);
  ctx.value.stroke();
}

function drawLine(x1: number, y1: number, x2: number, y2: number): void {
  if (!ctx.value || !canvas.value || !lineFlag.value) return;
  ctx.value.lineWidth = drawStyle.width;
  ctx.value.lineCap = "round";
  ctx.value.strokeStyle = drawStyle.color;
  ctx.value.beginPath();
  ctx.value.moveTo(x1, y1);
  ctx.value.lineTo(x2, y2);
  ctx.value.stroke();
}
function drawSquare(x1: number, y1: number, x2: number, y2: number): void {
  if (!ctx.value || !canvas.value || !squareFlag.value) return;
  ctx.value.lineWidth = drawStyle.width;
  ctx.value.lineCap = "round";
  ctx.value.strokeStyle = drawStyle.color;
  ctx.value.beginPath();
  ctx.value.rect(x1, y1, x2 - x1, y2 - y1);
  ctx.value.stroke();
}
function drawArc(x1: number, y1: number, x2: number, y2: number): void {
  if (!ctx.value || !canvas.value || !arcFlag.value) return;
  ctx.value.lineWidth = drawStyle.width;
  ctx.value.lineCap = "round";
  ctx.value.strokeStyle = drawStyle.color;
  ctx.value.beginPath();
  ctx.value.arc(
    x1,
    y1,
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2),
    0,
    2 * Math.PI
  );
  ctx.value.stroke();
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
