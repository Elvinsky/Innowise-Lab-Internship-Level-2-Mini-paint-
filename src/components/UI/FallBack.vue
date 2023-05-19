<template>
  <div
    class="no-found"
    v-if="images.photos.value && images.photos.value.length === 0"
  >
    <slot></slot>
  </div>
</template>
<style scoped lang="scss">
.no-found {
  margin-top: 2em;
  padding: 0.7em;
  background-color: rgba(255, 129, 129, 0.401);
  z-index: -999;
  border-radius: 8px;
  font-size: 2em;
}
</style>
<script setup lang="ts">
import { useImages } from "@/composables/useImages";
const images = useImages();
</script>
