<template>
  <div class="login-wrap">
    <h2>Login</h2>
    <form :class="user.authError.value ? 'error' : ''" @submit.prevent>
      <input
        id="email"
        v-model="input.email"
        placeholder="e-mail"
        name="email"
        type="text"
      />
      <input
        id="password"
        v-model="input.password"
        placeholder="password"
        name="password"
        type="password"
      />
      <div class="actions">
        <button @click="submit">Login</button>
        <RouterLink to="/registration" class="link">
          Noe yet have an account?
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
import ErrorToast from "@/components/ErrorToast.vue";
import SuccessToast from "@/components/SuccessToast.vue";
import { useUser } from "@/composables/useUser";

import { UserDataCompos } from "@/types/interfaces/composInterfaces";
import { UserInput } from "@/types/interfaces/userInterfaces";
import { reactive } from "vue";

const user: UserDataCompos = useUser();
const input: UserInput = reactive({
  email: "",
  password: "",
});

const submit = async () => {
  user.setUser(input.email, input.password);
};
const handleAbortToast = () => {
  user.showToast("");
};
</script>

<style scoped lang="scss">
@mixin for-phone {
  @media (max-width: 599px) {
    @content;
  }
}
.login-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
  margin-top: 5em;

  form {
    display: inherit;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(209, 209, 209, 0.641);
    border-radius: 5px;
    padding: 1em;
    gap: 0.6em;

    &.error input {
      border: 1px solid red;
    }
    button {
      align-self: flex-start;
      background-color: rgba(18, 219, 18, 0.4);
      padding: 0.4em 0.6em;
      border-radius: 5px;
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
