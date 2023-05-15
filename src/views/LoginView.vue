<template>
  <section>
    <h2>Login</h2>
    <form :class="error ? 'error' : ''" @submit.prevent>
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
    <ErrorToast v-if="toastShown === 'error'" @click="handleAbortToast"
      >Incorrect Creds! Try again!</ErrorToast
    >
    <SuccessToast v-if="toastShown === 'success'" @click="handleAbortToast"
      >You are ready to go!</SuccessToast
    >
  </section>
</template>

<script setup lang="ts">
import ErrorToast from "@/components/ErrorToast.vue";
import SuccessToast from "@/components/SuccessToast.vue";

import { useUser } from "@/composables/useUser";
import { auth } from "@/firebase";
import router from "@/router";
import { UserDataCompos } from "@/types/interfaces/composInterfaces";
import { UserInput } from "@/types/interfaces/userInterfaces";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Ref, reactive, ref } from "vue";

const input: UserInput = reactive({
  email: "",
  password: "",
});
const user: UserDataCompos = useUser();
const toastShown: Ref<string> = ref("");
const error: Ref<boolean> = ref(false);
const submit = (): void => {
  signInWithEmailAndPassword(auth, input.email, input.password)
    .then((creds) => {
      showToast("success");
      user.setUser(creds.user);
      router.push("/");
    })
    .catch(() => {
      error.value = true;
      showToast("error");
      input.email = "";
      input.password = "";
    });
};
const showToast = (toast: string) => {
  toastShown.value = toast;
  setTimeout(() => {
    toastShown.value = "";
  }, 5000);
};
const handleAbortToast = () => {
  toastShown.value = "";
};
</script>

<style scoped lang="scss">
section {
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
      justify-self: start;
      background-color: rgba(18, 219, 18, 0.4);
      padding: 0.4em 0.6em;
      border-radius: 5px;
      font-size: 0.9em;
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

    .link {
      font-size: 0.7em;
    }
  }
}
</style>
