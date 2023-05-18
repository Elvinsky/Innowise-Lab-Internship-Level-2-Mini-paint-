<template>
  <div>
    <h2>Registration</h2>
    <form :class="user.authError.value ? 'error' : ''" @submit.prevent>
      <input
        id="name"
        v-model="input.name"
        placeholder="username"
        name="name"
        type="text"
      />
      <input
        id="email"
        v-model="input.email"
        placeholder="e-mail"
        name="email"
        type="email"
      />
      <input
        id="password"
        v-model="input.password"
        placeholder="password"
        name="password"
        type="password"
      />
      <input
        id="repeatPassword"
        v-model="input.passwordConfirm"
        placeholder="repeat password"
        name="repeatPassword"
        type="password"
      />
      <div class="actions">
        <button @click="submit">Submit</button>
        <RouterLink to="/login" class="link">
          Already have an account?
        </RouterLink>
      </div>
    </form>
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
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useUser } from "@/composables/useUser";
import ErrorToast from "@/components/ErrorToast.vue";
import SuccessToast from "@/components/SuccessToast.vue";
import { UserData } from "@/types/interfaces/userInterfaces";

import { UserDataCompos } from "@/types/interfaces/composInterfaces";

const user: UserDataCompos = useUser();
const input: UserData = reactive({
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

const submit = (): void => {
  if (input.password !== input.passwordConfirm) {
    user.authError.value = true;
    user.showToast("error");
    input.name = "";
    input.email = "";
    input.password = "";
    input.passwordConfirm = "";
    return;
  }
  user.regUser(input.email, input.password, input.name);
};
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
  gap: 0.6em;
}
@mixin for-phone {
  @media (max-width: 599px) {
    @content;
  }
}

div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
  margin-top: 5em;

  form {
    @include form-style;

    &.error input {
      border-color: red;
      border-width: 1px;
      border-style: solid;
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

    input {
      padding: 0.5em;
      font-size: 1em;
      width: 200px;
    }
  }

  .actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
    @include for-phone {
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .link {
      font-size: 0.7em;
      @include for-phone {
        font-size: 1em;
      }
    }
  }
}
</style>
