<template>
  <CustomLoader v-if="photos.length === 0" />
  <section v-else>
    <HeaderComponent />
    <div class="image-container">
      <div
        class="image-item"
        v-for="image in photos"
        :key="image.downloadUrl"
        :id="image.downloadUrl"
      >
        <RouterLink
          :to="{
            name: 'canvasDetails',
            params: {
              id: image.metadata.uploadedAt,
              url: image.downloadUrl,
              user: image.metadata.uploadedBy,
              name: image.name,
            },
          }"
          ><img
            :src="image.downloadUrl"
            alt="image"
            class="canvas-img"
            @click="handleOpenDetails(image.downloadUrl)"
          />
          <span>{{ image.metadata.uploadedBy }}</span>
        </RouterLink>
      </div>
    </div>
    <FooterComponent />
  </section>
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import CustomLoader from "@/components/CustomLoader.vue";
import {
  useFetchCanvases,
  useFetchCanvasesLimited,
} from "@/composables/useFetchCanvases";
import { Photo } from "@/types/interfaces/photoInterface";
import { Ref } from "vue";
import { useRouter } from "vue-router";
const photos: Ref<Photo[]> = useFetchCanvasesLimited();
const router = useRouter();
const handleOpenDetails = (url: string) => {
  const urlId = url.substring(8);
  router.push(`/canvas/${urlId}`);
};
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
a span {
  text-decoration: none;
  color: black;
}
</style>
