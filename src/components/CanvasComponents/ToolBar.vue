<template>
  <aside class="actions">
    <img
      src="@/assets/pen.png"
      class="main-img"
      alt="pen"
      @click="handleDrawFlag"
      :class="canvas.flag.value === 'draw' ? 'active' : ''"
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
      :style="{ backgroundColor: canvas.penColor.value }"
      @click="showColorPick"
      v-if="props.isCreator"
    />
    <img
      src="@/assets/straight-line.png"
      alt="line"
      @click="handleLineFlag"
      class="main-img"
      :class="canvas.flag.value === 'line' ? 'active' : ''"
      v-if="props.isCreator"
    />
    <img
      src="@/assets/square.png"
      alt="square"
      @click="handleSquareFlag"
      class="main-img"
      :class="canvas.flag.value === 'square' ? 'active' : ''"
      v-if="props.isCreator"
    />
    <img
      src="@/assets/circle.png"
      alt="circle"
      @click="handleArcFlag"
      class="main-img"
      :class="canvas.flag.value === 'arc' ? 'active' : ''"
      v-if="props.isCreator"
    />
    <img
      src="@/assets/star.png"
      alt="star"
      @click="handleStarFlag"
      class="main-img"
      :class="canvas.flag.value === 'star' ? 'active' : ''"
      v-if="props.isCreator"
    />
    <img
      src="@/assets/return.png"
      alt="circle"
      @click="cancelLastAction"
      class="main-img"
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
      alt="delete"
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
      v-model="canvas.penWidth.value"
      v-if="widthRange"
    />
    <input
      type="color"
      class="color-pick"
      @input="handleColorPick"
      v-if="colorPick"
      v-model="canvas.penColor.value"
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
    <BaseToast :type="toast.toastShown.value"></BaseToast>
  </aside>
</template>

<script setup lang="ts">
import { cancelLastAction, clearCanvas } from "@/scripts/utils/canvasDrawUtil";
import { firebaseUpload } from "@/scripts/utils/uploadUtils";

import { Ref, ref, defineProps } from "vue";
import { CanvasCompos } from "@/types/interfaces/composInterfaces";
import { useCanvas } from "@/composables/useCanvas";
import BaseToast from "../Toast/BaseToast.vue";
import { useToast } from "@/composables/useToast";

const props = defineProps(["isCreator"]);
const toast = useToast();
const canvas: CanvasCompos = useCanvas();
const widthRange: Ref<boolean> = ref(false);
const colorPick: Ref<boolean> = ref(false);
const isSaving: Ref<boolean> = ref(false);
const fileName: Ref<string> = ref(Math.random().toString(36).substring(4));

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
  canvas.flag.value === "draw" ? canvas.setFlag("") : canvas.setFlag("draw");
}
function handleLineFlag(): void {
  canvas.flag.value === "line" ? canvas.setFlag("") : canvas.setFlag("line");
}
function handleSquareFlag(): void {
  canvas.flag.value === "square"
    ? canvas.setFlag("")
    : canvas.setFlag("square");
}
function handleArcFlag(): void {
  canvas.flag.value === "arc" ? canvas.setFlag("") : canvas.setFlag("arc");
}
function handleStarFlag(): void {
  canvas.flag.value === "star" ? canvas.setFlag("") : canvas.setFlag("star");
}

function handleWidthChange(event: InputEvent): void {
  canvas.setPenWidth((event.target as HTMLInputElement).valueAsNumber);
}
function handleClearCanvas(): void {
  clearCanvas();
}
const handleColorPick = (event: InputEvent) => {
  canvas.setPenColor((event.target as HTMLInputElement).value);
};
const handleSaveImage = () => {
  firebaseUpload(fileName.value)
    .then(() => {
      toast.showToast("success");
      isSaving.value = false;
      fileName.value = Math.random().toString(36).substring(4);
    })
    .catch((err) => {
      toast.showToast("error");
      console.log(err);
      isSaving.value = false;
    });
};
</script>

<style scoped lang="scss">
@mixin for-phone {
  @media (max-width: 599px) {
    @content;
  }
}
@mixin for-tablet {
  @media (max-width: 750px) {
    @content;
  }
}
.actions {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.7em;

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
}
</style>
