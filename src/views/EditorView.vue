<template>
  <section>
    <HeaderComponent>{{ username }}</HeaderComponent>
    <div class="editor-wrapper">
      <canvas id="canvas"></canvas>
    </div>
    <FooterComponent></FooterComponent>
  </section>
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { Ref, ref, onBeforeMount, nextTick } from "vue";

const username: Ref<string | null> = ref(
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!).name
    : null
);
const canvas: Ref<HTMLCanvasElement | null> = ref(null);
const ctx: Ref<CanvasRenderingContext2D | null> = ref(null);
const isDrawing: Ref<boolean> = ref(false);
(async () => {
  await nextTick(); // Wait for the next tick to ensure the canvas element is mounted
  canvas.value = document.getElementById("canvas") as HTMLCanvasElement;
  if (canvas.value) {
    ctx.value = canvas.value.getContext("2d") as CanvasRenderingContext2D;
  }
})().then(() => {
  if (canvas.value) {
    canvas.value.addEventListener("mousedown", startDrawing);
    canvas.value.addEventListener("mousemove", draw);
    canvas.value.addEventListener("mouseup", stopDrawing);
    canvas.value.addEventListener("mouseout", stopDrawing);
  }
});
function startDrawing(event: MouseEvent) {
  isDrawing.value = true;
  draw(event);
}

function draw(event: MouseEvent) {
  if (!isDrawing.value || !ctx.value || !canvas.value) return;

  // Calculate the offset between the canvas and the window
  const offsetX = canvas.value.offsetLeft;
  const offsetY = canvas.value.offsetTop;

  // Calculate the mouse position relative to the canvas
  const x = event.clientX - offsetX;
  const y = event.clientY - offsetY;

  ctx.value.lineWidth = 5;
  ctx.value.lineCap = "round";
  ctx.value.strokeStyle = "black";
  ctx.value.beginPath();
  ctx.value.moveTo(x, y);
  ctx.value.lineTo(x, y);
  ctx.value.stroke();
}

function stopDrawing() {
  isDrawing.value = false;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
canvas {
  border: 1px solid black;
  width: 70%;
  height: 70%;
  margin-top: 7em;
}
</style>
