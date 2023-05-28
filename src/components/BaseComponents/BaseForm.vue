<template>
  <form @submit.prevent>
    <BaseInput
      v-for="(field, index) in props.formData"
      :key="index"
      :onChange="handleChange"
      :type="field.type"
      :placeholder="field.placeholder"
      :error="props.error"
      :model="field.model"
    />
  </form>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import BaseInput from "./BaseInput.vue";
const props = defineProps(["formData", "error"]);
const emit = defineEmits(["userInput"]);
const handleChange = (value: string, model: string) => {
  emit("userInput", value, model);
};
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
