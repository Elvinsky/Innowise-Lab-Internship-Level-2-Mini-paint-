<template>
  <CustomLoader v-if="photos.length === 0" />
  <section v-else>
    <HeaderComponent />
    <div class="image-container">
      <div class="image-item" v-for="image in photos" :key="image.downloadUrl">
        <img :src="image.downloadUrl" alt="image" class="canvas-img" />
        <span>{{ image.metadata.uploadedBy }}</span>
      </div>
    </div>
    <FooterComponent />
  </section>
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import CustomLoader from "@/components/CustomLoader.vue";
import { useFetchCanvases } from "@/composables/useFetchCanvases";
import { Photo } from "@/types/interfaces/photoInterface";
import { Ref } from "vue";
const photos: Ref<Photo[]> = useFetchCanvases();
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.image-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.4em;
  padding: 1.3em;
}

.image-item {
  border-radius: 5px;
  background-color: rgba(240, 73, 249, 0.118);
  border: 1px solid rgba(0, 0, 0, 0.314);
  cursor: pointer;
  transition: all;
  transition-duration: 200ms;
}
.image-item:hover {
  transform: scale(1.1);
  box-shadow: 4px 4px 2px 1px rgba(91, 91, 91, 0.2);
}
.image-item span {
  font-size: 1.1em;
}
.canvas-img {
  margin: 0.5em;
  width: 260px;
  height: 130px;
}
</style>
