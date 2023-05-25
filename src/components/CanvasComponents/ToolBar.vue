<template>
  <aside class="actions">
    <div class="figures">
      <img
        src="@/assets/pen.png"
        class="main-img"
        alt="pen"
        @click="handleSetFlag('draw')"
        :class="canvas.flag.value === 'draw' ? 'active' : ''"
        v-if="isCreator"
      />
      <img
        src="@/assets/straight-line.png"
        alt="line"
        @click="handleSetFlag('line')"
        class="main-img"
        :class="canvas.flag.value === 'line' ? 'active' : ''"
        v-if="isCreator"
      />
      <img
        src="@/assets/square.png"
        alt="square"
        @click="handleSetFlag('square')"
        class="main-img"
        :class="canvas.flag.value === 'square' ? 'active' : ''"
        v-if="isCreator"
      />
      <img
        src="@/assets/circle.png"
        alt="circle"
        @click="handleSetFlag('arc')"
        class="main-img"
        :class="canvas.flag.value === 'arc' ? 'active' : ''"
        v-if="isCreator"
      />
      <img
        src="@/assets/star.png"
        alt="star"
        @click="handleSetFlag('star')"
        class="main-img"
        :class="canvas.flag.value === 'star' ? 'active' : ''"
        v-if="isCreator"
      />
    </div>
    <div class="stylers">
      <input
        type="color"
        class="color-pick"
        @input="handleColorPick"
        v-if="isCreator"
        v-model="canvas.penColor.value"
      />
      <div class="width-controller">
        <input
          v-if="widthShow"
          type="range"
          min="1"
          max="120"
          step="1"
          class="width-range"
          @change="handleWidthChange"
          v-model="canvas.penWidth.value"
        />
        <img
          src="@/assets/width.png"
          alt="star"
          @click="handleShowWidth"
          class="main-img"
          :class="widthShow ? 'active' : ''"
          v-if="isCreator"
        />
      </div>
    </div>
    <div class="canvas-actions">
      <img
        src="@/assets/return.png"
        alt="circle"
        @click="cancelLastAction"
        class="main-img"
        v-if="isCreator"
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
        v-if="isCreator"
      />
    </div>

    <BaseToast :type="toast.toastShown.value"></BaseToast>
  </aside>
  <div class="save-popup" v-if="isSaving">
    <div class="save-block">
      <input class="name-input" id="save-name" type="text" v-model="fileName" />
      <div class="save-action-block">
        <div @click="handlePopUpShow">Cancel</div>
        <div @click="handleSaveImage">Save</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cancelLastAction, clearCanvas } from "@/scripts/utils/canvasDrawUtil";
import { firebaseUpload } from "@/scripts/utils/uploadUtils";

import { Ref, ref } from "vue";
import BaseToast from "../Toast/BaseToast.vue";
import { useToast } from "@/composables/useToast";
import { useCanvas } from "@/composables/useCanvas";
import { CanvasCompos } from "@/types/interfaces/composInterfaces";
import { useRoute } from "vue-router";
import { useUser } from "@/composables/useUser";
const route = useRoute();
const user = useUser();

// const props = defineProps(["isCreator"]);
const isCreator: boolean =
  route.fullPath === "/editor"
    ? true
    : route.params.user === user.user.value?.email;
console.log(isCreator);
const toast = useToast();
const canvas: CanvasCompos = useCanvas();
const isSaving: Ref<boolean> = ref(false);
const fileName: Ref<string> = ref(Math.random().toString(36).substring(4));
const widthShow: Ref<boolean> = ref(false);

function handlePopUpShow() {
  isSaving.value = !isSaving.value;
}
function handleWidthChange(event: InputEvent): void {
  canvas.setPenWidth((event.target as HTMLInputElement).valueAsNumber);
}
const handleColorPick = (event: InputEvent) => {
  canvas.setPenColor((event.target as HTMLInputElement).value);
};
function handleSetFlag(flag: string): void {
  if (flag === canvas.flag.value) canvas.flag.value = "";
  else canvas.flag.value = flag;
}

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
const handleShowWidth = () => {
  widthShow.value = !widthShow.value;
};
const handleClearCanvas = () => {
  clearCanvas();
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 2em;
  position: relative;

  .figures,
  .canvas-actions {
    display: flex;
    flex-direction: column;
    gap: 0.3em;
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
    width: 60px;
    height: 60px;
  }

  .active {
    background-color: rgba(0, 255, 0, 0.44);
  }
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

  .save-block {
    margin: auto;
    border-radius: 8px;
    padding: 2em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    background-color: rgb(255, 255, 255);
  }
}
.stylers {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
  .color-pick {
    cursor: pointer;
    width: 25px;
    height: 25px;
    border: 0;
    transition: all;
    transition-duration: 200ms;
    &:hover {
      transform: scale(1.1);
    }
  }
  .width-range {
    transform: rotate(-90deg);
    position: absolute;
    right: 10%;
    @include for-phone {
      left: 10%;
    }
  }
}
.save-action-block {
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
</style>
