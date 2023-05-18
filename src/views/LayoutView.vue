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
<style scoped lang="scss">
$background-color: rgba(0, 30, 255, 0.177);

section {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  background-color: $background-color;
  height: 100%;
  margin-bottom: 3em;
}
</style>
