<template>
  <input v-model="value" />
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({
  type: String,
  value: String,
});
</script>

<style scoped></style>
