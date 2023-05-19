<template>
  <form :class="user.authError.value ? 'error' : ''" @submit.prevent>
    <slot></slot>
    <ErrorToast
      v-if="user.toastShown.value === 'error'"
      @click="handleAbortToast"
      >Incorrect Creds! Try again!</ErrorToast
    >
    <SuccessToast
      v-if="user.toastShown.value === 'success'"
      @click="handleAbortToast"
      >You are ready to go!</SuccessToast
    >
  </form>
</template>

<script setup lang="ts">
import { useUser } from "@/composables/useUser";
import { UserDataCompos } from "@/types/interfaces/composInterfaces";
import SuccessToast from "@/components/Toasts/SuccessToast.vue";
import ErrorToast from "@/components/Toasts/ErrorToast.vue";
const user: UserDataCompos = useUser();
const handleAbortToast = () => {
  user.showToast("");
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
