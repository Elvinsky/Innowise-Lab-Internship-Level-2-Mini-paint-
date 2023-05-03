<template>
  <div class="actions">
    <img
      src="@/assets/pen.png"
      class="main-img"
      alt="pen"
      @click="handleDrawFlag"
      :class="flag.flag.value === 'draw' ? 'active' : ''"
    />
    <div>
      <img
        src="@/assets/width.png"
        class="main-img"
        alt="width"
        @click="showWidthRange"
      />
      <input
        type="range"
        min="1"
        max="120"
        step="1"
        class="width-range"
        @change="handleWidthChange"
        v-model="drawStyle.penWidth.value"
        v-if="widthRange"
      />
    </div>
    <div
      class="color-circle"
      :style="{ backgroundColor: drawStyle.penColor.value }"
      @click="showColorPick"
    />
    <input
      type="color"
      class="color-pick"
      @input="handleColorPick"
      v-if="colorPick"
      v-model="drawStyle.penColor.value"
    />
    <img
      src="@/assets/straight-line.png"
      alt="line"
      @click="handleLineFlag"
      class="main-img"
      :class="flag.flag.value === 'line' ? 'active' : ''"
    />
    <img
      src="@/assets/square.png"
      alt="square"
      @click="handleSquareFlag"
      class="main-img"
      :class="flag.flag.value === 'square' ? 'active' : ''"
    />
    <img
      src="@/assets/circle.png"
      alt="circle"
      @click="handleArcFlag"
      class="main-img"
      :class="flag.flag.value === 'arc' ? 'active' : ''"
    />
    <img
      src="@/assets/refresh-arrow.png"
      class="main-img"
      @click="handleClearCanvas"
    />
  </div>
</template>

<script setup lang="ts">
import { useCanvasFlag } from "@/composables/useCanvasFlags";
import { useDrawingStyle } from "@/composables/useDrawingStyle";
import { clearCanvas } from "@/scripts/utils/canvasDrawUtil";
import { CanvasFlagCompos, DrawingStyleCompos } from "@/types/interfaces";
import { Ref, ref } from "vue";
const flag: CanvasFlagCompos = useCanvasFlag();
const widthRange: Ref<boolean> = ref(false);
const colorPick: Ref<boolean> = ref(false);
const drawStyle: DrawingStyleCompos = useDrawingStyle();

function showWidthRange(): void {
  widthRange.value = !widthRange.value;
  colorPick.value = false;
}
function showColorPick(): void {
  colorPick.value = !colorPick.value;
  widthRange.value = false;
}
function handleDrawFlag(): void {
  flag.flag.value === "draw" ? flag.setFlag("") : flag.setFlag("draw");
}
function handleLineFlag(): void {
  flag.flag.value === "line" ? flag.setFlag("") : flag.setFlag("line");
}
function handleSquareFlag(): void {
  flag.flag.value === "square" ? flag.setFlag("") : flag.setFlag("square");
}
function handleArcFlag(): void {
  flag.flag.value === "arc" ? flag.setFlag("") : flag.setFlag("arc");
}

function handleWidthChange(event: InputEvent): void {
  drawStyle.setWidth((event.target as HTMLInputElement).valueAsNumber);
}
function handleClearCanvas(): void {
  clearCanvas();
}
const handleColorPick = (event: InputEvent) => {
  console.log((event.target as HTMLInputElement).value);
  drawStyle.setColor((event.target as HTMLInputElement).value);
};
</script>

<style scoped>
.width-range {
  position: absolute;
  left: 140px;
  transform: rotate(-90deg);
}
.color-pick {
  position: absolute;
  left: 140px;
  top: 230px;
  width: 60px;
  height: 60px;
}
.actions {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.7em;
}
.active {
  background-color: rgba(0, 255, 0, 0.44);
}
.color-circle {
  border-radius: 50%;
  width: 25px;
  height: 25px;
  border: 1px solid rgba(0, 0, 0, 0.342);
  cursor: pointer;
  transition: all;
  transition-duration: 200ms;
}
.color-circle:hover {
  transform: scale(1.1);
}
.main-img {
  width: 25px;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.4em;
  transition: all;
  transition-duration: 200ms;
}
.main-img:hover {
  transform: scale(1.1);
}
</style>
