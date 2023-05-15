<template>
  <section>
    <HeaderComponent />
    <RouterView />
    <FooterComponent />
  </section>
</template>
<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>
<style scoped>
section {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
</style>
