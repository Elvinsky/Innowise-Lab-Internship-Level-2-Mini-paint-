<template>
  <canvas
    id="canvas"
    @mousedown="start"
    @mouseup="stop"
    @mousemove="draw"
  ></canvas>
</template>

<script setup lang="ts">
import { draw, start, stop } from "@/scripts/utils/canvasDrawUtil";
import { initCanvas } from "@/scripts/utils/initCanvasUtil";
initCanvas();
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
