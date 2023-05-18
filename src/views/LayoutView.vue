<template>
  <div></div>
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
div {
  position: absolute;
  z-index: -9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: rgba(131, 145, 255, 0.133);
}
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
