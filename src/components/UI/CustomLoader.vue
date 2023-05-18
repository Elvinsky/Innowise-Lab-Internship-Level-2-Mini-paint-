<template>
  <div class="loader">
    <breeding-rhombus-spinner
      :animation-duration="2000"
      :size="100"
      color="#ff1d5e"
    />
  </div>
</template>
<script setup lang="ts">
import { BreedingRhombusSpinner } from "epic-spinners";
</script>
<style scoped>
.loader {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
