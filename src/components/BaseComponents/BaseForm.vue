<template>
  <form :class="props.error ? 'error' : ''" @submit.prevent>
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps(["error"]);
</script>

<style scoped lang="scss">
$padding: 0.4em 0.6em;
$border-radius: 5px;
$input-width: 200px;

@mixin form-style {
  display: inherit;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(209, 209, 209, 0.641);
  border-radius: 5px;
  padding: 1em;
  gap: 0.6em;
}
@mixin for-phone {
  @media (max-width: 599px) {
    @content;
  }
}

form {
  @include form-style;
}
</style>
