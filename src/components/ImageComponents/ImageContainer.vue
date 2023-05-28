<template>
  <div class="image-container">
    <ImageTile
      v-for="image in images"
      :key="image.downloadUrl"
      :image="image"
    ></ImageTile>
  </div>
</template>

<script setup lang="ts">
import ImageTile from "@/components/ImageComponents/ImageTile.vue";
import { useImages } from "@/composables/useImages";
import { fetchCanvasesByCreator } from "@/utils/fetchCanvasUtil";
const { images, page, limit, setTotalPages, setLimit } = useImages();
setLimit(12);
fetchCanvasesByCreator(page.value, limit.value).then((data) => {
  if (data) {
    setTotalPages(data);
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
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.4em;
  padding: 1.3em;
}
</style>
