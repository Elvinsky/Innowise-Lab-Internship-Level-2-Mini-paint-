<template>
  <canvas
    id="canvas"
    @mousedown="start"
    @mouseup="stop"
    @mousemove="draw"
  ></canvas>
</template>

<script setup lang="ts">
import { useImages } from "@/composables/useImages";
import { draw, start, stop } from "@/utils/canvasDrawUtil";
import { initCanvas } from "@/utils/initCanvasUtil";
import { ImagesComposableInterface } from "@/types/interfaces/composableInterfaces";
import { onMounted } from "vue";
import { drawnElements } from "@/utils/canvasDrawUtil";
import { useRoute } from "vue-router";
const { setCurrentImageData }: ImagesComposableInterface = useImages();
const route = useRoute();
initCanvas();
onMounted(() => {
  drawnElements.value = [];
  if (route.fullPath === "/editor") setCurrentImageData(null);
});
</script>

<style scoped lang="scss">
@mixin for-phone {
  @media (max-width: 599px) {
    @content;
  }
}
canvas {
  border: 1px solid black;
  background-color: rgba(212, 212, 212, 0.549);
  border-radius: 5px;
}
</style>
