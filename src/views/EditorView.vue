<template>
  <div class="wrapper">
    <div class="editor-wrapper">
      <ToolBar :isCreator="true" />
      <canvas
        id="canvas"
        @mousedown="start"
        @mouseup="stop"
        @mousemove="draw"
      ></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import ToolBar from "@/components/ToolBar.vue";
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
.wrapper {
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
      width: 1000px;
      height: 500px;
      @include for-phone {
        width: 300px;
        height: 500px;
      }
    }
  }
}
</style>
