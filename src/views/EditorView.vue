<template>
  <section>
    <HeaderComponent>{{ username }}</HeaderComponent>
    <div class="editor-wrapper">
      <div class="actions">
        <img
          src="@/assets/pen.png"
          alt="pen"
          @click="handleDrawFlag"
          :class="drawFlag ? 'active' : ''"
        />
      </div>
      <canvas
        id="canvas"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @mouseout="stopDrawing"
      ></canvas>
    </div>
    <FooterComponent></FooterComponent>
  </section>
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { Ref, ref, nextTick, reactive } from "vue";
import { CanvasSizes } from "@/types/interfaces";

const username: Ref<string | null> = ref(
  localStorage.getItem("user")
    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      JSON.parse(localStorage.getItem("user")!).name
    : null
);
const canvas: Ref<HTMLCanvasElement | null> = ref(null);
const ctx: Ref<CanvasRenderingContext2D | null> = ref(null);
const sizes: CanvasSizes = reactive({
  width: 1000,
  height: 500,
});
const isDrawing: Ref<boolean> = ref(false);
const drawFlag: Ref<boolean> = ref(false);
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
function handleDrawFlag(): void {
  drawFlag.value ? (drawFlag.value = false) : (drawFlag.value = true);
  console.log(drawFlag.value);
}
function startDrawing(event: MouseEvent) {
  isDrawing.value = true;
  draw(event);
}
function stopDrawing() {
  isDrawing.value = false;
}
function draw(event: MouseEvent): void {
  if (!isDrawing.value || !ctx.value || !canvas.value || !drawFlag.value)
    return;

  // Calculate the offset between the canvas and the window
  const offsetX: number = canvas.value.offsetLeft;
  const offsetY: number = canvas.value.offsetTop;

  // Calculate the mouse position relative to the canvas
  const x: number = event.clientX - offsetX;
  const y: number = event.clientY - offsetY;

  ctx.value.lineWidth = 5;
  ctx.value.lineCap = "round";
  ctx.value.strokeStyle = "black";
  ctx.value.beginPath();
  ctx.value.moveTo(x, y);
  ctx.value.lineTo(x, y);
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
.actions {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.7em;
}
.active {
  background-color: rgba(0, 255, 0, 0.44);
}
.actions img {
  width: 25px;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.4em;
}
.actions img:hover {
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
