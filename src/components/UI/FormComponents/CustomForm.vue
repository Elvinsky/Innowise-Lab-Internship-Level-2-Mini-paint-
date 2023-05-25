<template>
  <form :class="user.authError.value ? 'error' : ''" @submit.prevent>
    <slot></slot>
    <BaseToast :type="toast.toastShown.value"></BaseToast>
  </form>
</template>

<script setup lang="ts">
import BaseToast from "@/components/Toast/CustomToast.vue";
import { useToast } from "@/composables/useToast";
import { useUser } from "@/composables/useUser";
const toast = useToast();
const user = useUser();
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
