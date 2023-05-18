<template>
  <CustomLoader v-if="!canvases.photos.value" />
  <div class="wrapper">
    <ImageSearchBar />
    <FallBack v-if="canvases.photos.value && canvases.photos.value.length === 0"
      >Sorry,nothing was found</FallBack
    >
    <div class="image-container">
      <ImageTile
        v-for="image in canvases.photos.value"
        :key="image.downloadUrl"
        :image="image"
      ></ImageTile>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomLoader from "@/components/UI/CustomLoader.vue";
import FallBack from "@/components/UI/FallBack.vue";
import ImageTile from "@/components/ImageComponents/ImageTile.vue";
import ImageSearchBar from "@/components/ImageComponents/ImageSearchBar.vue";
import { useImages } from "@/composables/useImages";
import { PaginationInterface } from "@/types/interfaces/composInterfaces";

const canvases: PaginationInterface = useImages();
</script>

<style scoped lang="scss">
@mixin for-phone {
  @media (max-width: 599px) {
    @content;
  }
}
.wrapper {
  .image-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.4em;
    padding: 1.3em;
    @include for-phone {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
