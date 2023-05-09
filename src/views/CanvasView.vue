<template>
  <section>
    <HeaderComponent />
    <FooterComponent />
  </section>
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route.params.id);
</script>

<style scoped></style>
