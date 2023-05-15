<template>
  <div class="wrapper">
    <img :src="route.params.url" class="img-preload" id="preload" />
    <div class="editor-wrapper">
      <ToolBar :filename="route.params.name" :isCreator="isCreator" />
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
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import {
  CanvasCompos,
  CanvasContextCompos,
  CanvasFlagCompos,
  LineInterface,
} from "@/types/interfaces/composInterfaces";
import { useCanvasFlag } from "@/composables/useCanvasFlags";
import { useCanvas, useCanvasContext } from "@/composables/useCanvasContext";
import { drawFigure, freeDraw } from "@/scripts/utils/canvasDrawUtil";
import ToolBar from "@/components/ToolBar.vue";
import { useRoute } from "vue-router";
import { auth } from "@/firebase";
import { useLineCoords } from "@/composables/useLineCoords";
import { initCanvas } from "@/scripts/utils/initCanvasUtil";

const route = useRoute();
const isCreator: Ref<boolean> = ref(
  route.params.user === auth.currentUser?.email
);
const flag: CanvasFlagCompos = useCanvasFlag();
const canvas: CanvasCompos = useCanvas();
const ctx: CanvasContextCompos = useCanvasContext();
const isDrawing: Ref<boolean> = ref(false);
initCanvas();
const line: LineInterface = useLineCoords();
function startDrawing(event: MouseEvent) {
  isDrawing.value = true;
  draw(event);
}
function startLineDrawing(event: MouseEvent) {
  if (
    !ctx.ctx.value ||
    !canvas.canvas.value ||
    (flag.flag.value !== "line" &&
      flag.flag.value !== "square" &&
      flag.flag.value !== "arc")
  )
    return;

  const offsetX: number = canvas.canvas.value.offsetLeft;
  const offsetY: number = canvas.canvas.value.offsetTop;

  line.setX1(event.clientX - offsetX);
  line.setY1(event.clientY - offsetY);
}
function stopLineDrawing(event: MouseEvent) {
  if (
    !ctx.ctx.value ||
    !canvas.canvas.value ||
    (flag.flag.value !== "line" &&
      flag.flag.value !== "square" &&
      flag.flag.value !== "arc")
  )
    return;

  const offsetX: number = canvas.canvas.value.offsetLeft;
  const offsetY: number = canvas.canvas.value.offsetTop;

  line.setX2(event.clientX - offsetX);
  line.setY2(event.clientY - offsetY);
  if (flag.flag.value === "line") drawFigure();
  else if (flag.flag.value === "square") drawFigure();
  else if (flag.flag.value === "arc") drawFigure();
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
