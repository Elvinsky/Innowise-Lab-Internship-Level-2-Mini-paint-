<template>
  <div class="layout">
    <HeaderComponent />
    <RouterView />
    <FooterComponent />
  </div>
</template>
<script setup lang="ts">
import HeaderComponent from "@/components/UI/PageSegments/HeaderComponent.vue";
import FooterComponent from "@/components/UI/PageSegments/FooterComponent.vue";
</script>
<style scoped lang="scss">
.layout {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  margin-bottom: 3em;
}
</style>
