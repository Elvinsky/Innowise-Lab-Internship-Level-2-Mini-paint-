<template>
  <div class="image-container">
    <ImageTile
      v-for="image in images.photos.value"
      :key="image.downloadUrl"
      :image="image"
    ></ImageTile>
  </div>
</template>

<script setup lang="ts">
import ImageTile from "@/components/ImageComponents/ImageTile.vue";
import { useImages } from "@/composables/useImages";
import { fetchCanvasesByCreator } from "@/scripts/utils/fetchCanvasUtil";
const images = useImages();
const isMobile = window.innerWidth < 750;
isMobile ? images.setLimit(4) : images.setLimit(16);
fetchCanvasesByCreator(images.page.value, images.limit.value).then((data) => {
  if (data) {
    images.setTotalPages(data);
  }
});
</script>

<style scoped lang="scss">
@mixin for-phone {
  @media (max-width: 599px) {
    @content;
  }
}
.image-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.4em;
  padding: 1.3em;
  @include for-phone {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
