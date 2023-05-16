<template>
  <aside class="actions">
    <img
      src="@/assets/pen.png"
      class="main-img"
      alt="pen"
      @click="handleDrawFlag"
      :class="flag.flag.value === 'draw' ? 'active' : ''"
      v-if="props.isCreator"
    />
    <img
      src="@/assets/width.png"
      class="main-img"
      alt="width"
      @click="showWidthRange"
      v-if="props.isCreator"
    />
    <div
      class="color-circle"
      :style="{ backgroundColor: drawStyle.penColor.value }"
      @click="showColorPick"
      v-if="props.isCreator"
    />
    <img
      src="@/assets/straight-line.png"
      alt="line"
      @click="handleLineFlag"
      class="main-img"
      :class="flag.flag.value === 'line' ? 'active' : ''"
      v-if="props.isCreator"
    />
    <img
      src="@/assets/square.png"
      alt="square"
      @click="handleSquareFlag"
      class="main-img"
      :class="flag.flag.value === 'square' ? 'active' : ''"
      v-if="props.isCreator"
    />
    <img
      src="@/assets/circle.png"
      alt="circle"
      @click="handleArcFlag"
      class="main-img"
      :class="flag.flag.value === 'arc' ? 'active' : ''"
      v-if="props.isCreator"
    />
    <img
      src="@/assets/diskette.png"
      alt="save"
      @click="handlePopUpShow"
      class="main-img"
    />
    <img
      src="@/assets/bin.png"
      class="main-img"
      @click="handleClearCanvas"
      v-if="props.isCreator"
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
    <input
      type="color"
      class="color-pick"
      @input="handleColorPick"
      v-if="colorPick"
      v-model="drawStyle.penColor.value"
    />
    <div class="save-popup" v-if="isSaving">
      <div class="save-block">
        <input
          class="name-input"
          id="save-name"
          type="text"
          v-model="fileName"
        />
        <div class="action-block">
          <div @click="handlePopUpShow">Cancel</div>
          <div @click="handleSaveImage">Save</div>
        </div>
      </div>
    </div>
    <ErrorToast v-if="toastShown === 'error'" @click="handleAbortToast"
      >Unexpected Error while saving =(</ErrorToast
    >
    <SuccessToast v-if="toastShown === 'success'" @click="handleAbortToast"
      >Your image have been saved</SuccessToast
    >
  </aside>
</template>

<script setup lang="ts">
import { useCanvasFlag } from "@/composables/useCanvasFlags";
import { useDrawingStyle } from "@/composables/useDrawingStyle";
import { clearCanvas } from "@/scripts/utils/canvasDrawUtil";
import { firebaseUpload } from "@/scripts/utils/uploadUtils";
import {
  CanvasFlagCompos,
  DrawingStyleCompos,
} from "@/types/interfaces/composInterfaces";
import { Ref, ref, defineProps } from "vue";
import ErrorToast from "./ErrorToast.vue";
import SuccessToast from "./SuccessToast.vue";
const props = defineProps(["filename", "isCreator"]);
const flag: CanvasFlagCompos = useCanvasFlag();
const drawStyle: DrawingStyleCompos = useDrawingStyle();
const widthRange: Ref<boolean> = ref(false);
const colorPick: Ref<boolean> = ref(false);
const isSaving: Ref<boolean> = ref(false);
const toastShown: Ref<string> = ref("");
const fileName: Ref<string> = ref(
  props.filename ? props.filename : "canvas-img"
);

function showWidthRange(): void {
  widthRange.value = !widthRange.value;
  colorPick.value = false;
}
function showColorPick(): void {
  colorPick.value = !colorPick.value;
  widthRange.value = false;
}
function handlePopUpShow() {
  isSaving.value = !isSaving.value;
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
const handleAbortToast = () => {
  toastShown.value = "";
};
function handleWidthChange(event: InputEvent): void {
  drawStyle.setWidth((event.target as HTMLInputElement).valueAsNumber);
}
function handleClearCanvas(): void {
  clearCanvas();
}
const handleColorPick = (event: InputEvent) => {
  drawStyle.setColor((event.target as HTMLInputElement).value);
};
const showToast = (toast: string) => {
  toastShown.value = toast;
  setTimeout(() => {
    toastShown.value = "";
  }, 5000);
};
const handleSaveImage = () => {
  firebaseUpload(fileName.value)
    .then(() => {
      showToast("success");
      isSaving.value = false;
    })
    .catch((err) => {
      showToast("error");
      console.log(err);
      isSaving.value = false;
    });
};
</script>

<style scoped lang="scss">
.width-range {
  position: absolute;
  left: 140px;
  transform: rotate(-90deg);
}
.save-block {
  margin: auto;
  border-radius: 8px;
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  background-color: rgb(255, 255, 255);

  .action-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1em;

    div {
      cursor: pointer;
      padding: 0.5em;
      border-radius: 5px;
      transition: all;
      transition-duration: 200ms;

      &:hover {
        transform: scale(1.1);
      }

      &:first-child {
        background-color: rgba(232, 69, 69, 0.785);
      }

      &:nth-child(2) {
        background-color: rgba(74, 232, 69, 0.785);
      }
    }
  }
}
.main-img {
  width: 25px;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.4em;
  transition: all;
  transition-duration: 200ms;

  &:hover {
    transform: scale(1.1);
  }
}
.color-pick {
  position: absolute;
  left: 140px;
  top: 280px;
  width: 60px;
  height: 60px;
}

.save-popup {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background-color: rgba(153, 153, 153, 0.656);

  display: flex;
  align-items: center;
  justify-content: center;
}

.name-input {
  padding: 0.3em;
  font-size: 1em;
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

  &:hover {
    transform: scale(1.1);
  }
}
</style>
