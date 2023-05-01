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
(async () => {
  await nextTick(); // Wait for the next tick to ensure the canvas element is mounted
  canvas.value = document.getElementById("canvas") as HTMLCanvasElement;
  if (canvas.value) {
    ctx.value = canvas.value.getContext("2d") as CanvasRenderingContext2D;
  }
})().then(() => {
  console.log(ctx.value);
});
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
