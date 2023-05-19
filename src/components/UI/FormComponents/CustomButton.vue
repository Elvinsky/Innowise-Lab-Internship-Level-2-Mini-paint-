<template>
  <button @click="handleClick"><slot></slot></button>
</template>

<script setup lang="ts">
import { useUser } from "@/composables/useUser";
import { ActionFlag } from "@/types/literals/literals";
import { defineProps } from "vue";
const props = defineProps({
  action: String,
  customAction: Function,
});
const userAction: ActionFlag = props.action as ActionFlag;
const user = useUser();
const action = user[userAction];
const handleClick = () => {
  action(user.userInput);
};
</script>

<style scoped lang="scss">
$padding: 0.4em 0.6em;
$border-radius: 5px;
$input-width: 200px;
@mixin for-phone {
  @media (max-width: 599px) {
    @content;
  }
}
button {
  align-self: flex-start;
  justify-self: start;
  background-color: rgba(18, 219, 18, 0.4);
  padding: $padding;
  border-radius: $border-radius;
  font-size: 0.9em;
  @include for-phone {
    font-size: 1em;
    align-self: center;
  }
}
</style>
