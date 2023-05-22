<template>
  <HeaderComponent />
  <section>
    <RouterView />
  </section>
  <FooterComponent />
</template>
<script setup lang="ts">
import HeaderComponent from "@/components/UI/PageSegments/HeaderComponent.vue";
import FooterComponent from "@/components/UI/PageSegments/FooterComponent.vue";
</script>
<style scoped lang="scss">
section {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  margin-bottom: 3em;
}
</style>
