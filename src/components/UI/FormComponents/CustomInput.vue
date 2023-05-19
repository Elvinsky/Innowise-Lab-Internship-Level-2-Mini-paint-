<template>
  <input
    :id="props.id"
    :name="props.id"
    :placeholder="props.id"
    :type="props.type"
    v-model="user.userInput.value[inputModel]"
    :class="user.authError.value ? 'error' : ''"
    @submit.prevent
  />
</template>

<script setup lang="ts">
import { useUser } from "@/composables/useUser";
import { InputFlag } from "@/types/literals/literals";
import { defineProps } from "vue";
const user = useUser();
const props = defineProps({
  inputFlag: String,
  type: String,
  id: String,
});
const inputModel: InputFlag = props.inputFlag as InputFlag;
</script>

<style scoped lang="scss">
input {
  padding: 0.5em;
  font-size: 1em;
  width: 200px;
  &.error {
    border-color: red;
    border-width: 1px;
    border-style: solid;
  }
}
</style>
