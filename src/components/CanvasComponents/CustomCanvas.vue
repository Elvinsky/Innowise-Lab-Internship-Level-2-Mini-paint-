<template>
  <div class="editor-wrapper">
    <ToolBar :isCreator="props.isCreator" />
    <canvas
      id="canvas"
      @mousedown="start"
      @mouseup="stop"
      @mousemove="draw"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import ToolBar from "@/components/CanvasComponents/ToolBar.vue";
import { draw, start, stop } from "@/scripts/utils/canvasDrawUtil";
import { initCanvas } from "@/scripts/utils/initCanvasUtil";
initCanvas();
const props = defineProps(["isCreator", "filename"]);
</script>

<style scoped lang="scss">
@mixin for-phone {
  @media (max-width: 599px) {
    @content;
  }
}
.editor-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1em;
  margin-top: 1em;

  canvas {
    border: 1px solid black;
    background-color: rgba(212, 212, 212, 0.549);
    border-radius: 5px;
  }
}
</style>
