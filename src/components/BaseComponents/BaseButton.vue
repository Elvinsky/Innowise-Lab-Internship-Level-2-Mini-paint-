<template>
  <button @click="handleClick()" :class="props.class" :disabled="disabled">
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
import { Ref, defineEmits, defineProps, ref } from "vue";
const disabled: Ref<boolean> = ref(false);
const props = defineProps({
  class: String,
});

const emit = defineEmits(["click"]);
const handleClick = () => {
  emit("click");
  disabled.value = true;
  setTimeout(() => {
    disabled.value = false;
  }, 800);
};
</script>
<style scoped lang="scss">
$padding: 0.5em 0.7em;
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
button.cancel {
  align-self: flex-start;
  justify-self: start;
  background-color: rgba(219, 18, 18, 0.4);
  padding: $padding;
  border-radius: $border-radius;
  font-size: 1em;
  @include for-phone {
    font-size: 1em;
    align-self: center;
  }
}
button.accept {
  align-self: flex-start;
  justify-self: start;
  background-color: rgba(18, 219, 51, 0.4);
  padding: $padding;
  border-radius: $border-radius;
  font-size: 1em;
  @include for-phone {
    font-size: 1em;
    align-self: center;
  }
}
</style>
