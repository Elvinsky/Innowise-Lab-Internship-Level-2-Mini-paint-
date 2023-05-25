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
import { draw, start, stop } from "@/scripts/utils/canvasDrawUtil";
import { initCanvas } from "@/scripts/utils/initCanvasUtil";
import { ImagesComposableInterface } from "@/types/interfaces/composableInterfaces";
import { onUnmounted } from "vue";
const images: ImagesComposableInterface = useImages();
initCanvas();
onUnmounted(() => {
  images.setCurrentImageData(null);
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
