<template>
  <div class="wrapper">
    <img :src="route.params.url" class="img-preload" id="preload" />
    <div class="editor-wrapper">
      <ToolBar :filename="route.params.name" :isCreator="isCreator" />
      <canvas
        id="canvas"
        @mousedown="
          startDrawing($event);
          lineDraw($event);
        "
        @mousemove="draw"
        @mouseup="
          stopDrawing();
          stopLineDrawing($event);
        "
        @mouseout="stopDrawing()"
      ></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import {
  finishDrawing,
  freeDraw,
  startLineDrawing,
} from "@/scripts/utils/canvasDrawUtil";
import ToolBar from "@/components/ToolBar.vue";
import { useRoute } from "vue-router";
import { auth } from "@/firebase";
import { initCanvas } from "@/scripts/utils/initCanvasUtil";
initCanvas();
const route = useRoute();
const isCreator: Ref<boolean> = ref(
  route.params.user === auth.currentUser?.email
);
const isDrawing: Ref<boolean> = ref(false);
function startDrawing(event: MouseEvent) {
  isDrawing.value = true;
  draw(event);
}
function lineDraw(event: MouseEvent) {
  startLineDrawing(event);
}
function stopLineDrawing(event: MouseEvent) {
  finishDrawing(event);
}
function stopDrawing() {
  isDrawing.value = false;
}
function draw(event: MouseEvent): void {
  if (!isDrawing.value) return;
  else {
    freeDraw(event);
  }
}
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
    margin-top: 3em;

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

  .img-preload {
    display: none;
  }
}
</style>
