<template>
  <input
    :value="props.value"
    @input="handleChange"
    :type="props.type"
    :placeholder="props.placeholder"
    :class="props.error ? 'error' : ''"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  value: String,
  type: String,
  error: Boolean,
  placeholder: String,
  model: String,
});
const emit = defineEmits(["change"]);
const handleChange = (event: Event) => {
  const newValue = (event.target as HTMLInputElement).value;
  emit("change", newValue, props.model);
};
</script>

<style scoped lang="scss">
input {
  padding: 0.3em;
  font-size: 1em;
  width: 200px;
  &.error {
    border-color: red;
    border-width: 1px;
    border-style: solid;
  }
}
</style>
