<template>
  <div
    class="toast-wrapper"
    :class="toast.toastShown.value"
    @click="handleAbortToast"
    v-if="toast.toastShown.value !== ''"
  >
    <img
      :src="
        toast.toastShown.value === 'error'
          ? returnIcon('error.png')
          : returnIcon('mark.png')
      "
      alt="status-icon"
    />
    <div v-if="toast.toastShown.value === 'error'" class="text">
      Unexpected error, try again
    </div>
    <div v-else class="text">You are all good, proceeding</div>
  </div>
</template>
<script setup lang="ts">
import { useToast } from "@/composables/useToast";
const toast = useToast();
const returnIcon = (name: string) => {
  return require(`@/assets/${name}`);
};
const handleAbortToast = () => {
  toast.showToast("");
};
</script>

<style scoped lang="scss">
.toast-wrapper {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 3em;
  padding: 0.6em;
  border-radius: 8px;
  box-shadow: 2px 3px 2px 1px rgba(0, 0, 0, 0.152);
  -webkit-transition: opacity 0.7s;
  transition: opacity 0.7s;

  font-size: 1.2em;

  width: 350px;
  height: fit-content;
  position: fixed;
  z-index: 9999;
  top: 20px;
  right: 20px;
  img {
    width: 25px;
  }
  .text {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.error {
  background-color: rgba(255, 101, 101, 0.459);
}
.success {
  background-color: rgba(134, 255, 101, 0.459);
}
</style>
