<template>
  <button @click="handleClick" :class="props.class"><slot></slot></button>
</template>

<script setup lang="ts">
import { useUser } from "@/composables/useUser";
import { ActionFlag } from "@/types/literals/literals";
import { defineProps } from "vue";
const props = defineProps({
  action: String,
  customAction: Function,
  class: String,
});
const userAction: ActionFlag = props.action as ActionFlag;
const user = useUser();
const action = user[userAction];
const handleClick = () => {
  if (props.action) {
    action(user.userInput);
  } else if (props.customAction) {
    props.customAction();
  }
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
button.auth {
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
button.home {
  font-size: 2em;
  color: black;
  padding: 0.4em;
  border-radius: 8px;
  background-color: #fc9797;
  transition: all 200ms;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    box-shadow: 10px 10px 2px 1px rgba(0, 0, 83, 0.2);
  }
}
</style>
