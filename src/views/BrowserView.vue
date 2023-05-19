<template>
  <CustomLoader />
  <div class="wrapper">
    <ImageSearchBar />
    <FallBack>Sorry,nothing was found</FallBack>
    <ImageContainer />
  </div>
</template>

<script setup lang="ts">
import CustomLoader from "@/components/UI/LoadingComponents/CustomLoader.vue";
import FallBack from "@/components/UI/LoadingComponents/FallBack.vue";
import ImageSearchBar from "@/components/ImageComponents/ImageSearchBar.vue";
import ImageContainer from "@/components/ImageComponents/ImageContainer.vue";
</script>
