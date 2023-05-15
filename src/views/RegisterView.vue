<template>
  <section>
    <h2>Registration</h2>
    <form :class="error ? 'error' : ''" @submit.prevent>
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
    <ErrorToast v-if="toastShown === 'error'" @click="handleAbortToast"
      >Incorrect Creds! Try again!</ErrorToast
    >
    <SuccessToast v-if="toastShown === 'success'" @click="handleAbortToast"
      >You are ready to go!</SuccessToast
    >
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Ref, ref } from "vue";
import { useUser } from "@/composables/useUser";
import ErrorToast from "@/components/ErrorToast.vue";
import SuccessToast from "@/components/SuccessToast.vue";
import { UserData } from "@/types/interfaces/userInterfaces";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase";
import router from "@/router";
import { UserDataCompos } from "@/types/interfaces/composInterfaces";

const user: UserDataCompos = useUser();
let error: Ref<boolean> = ref(false);
const toastShown: Ref<string> = ref("");
const input: UserData = reactive({
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

const submit = (): void => {
  if (input.password !== input.passwordConfirm) {
    error.value = true;
    showToast("error");
    input.name = "";
    input.email = "";
    input.password = "";
    input.passwordConfirm = "";
    return;
  }
  createUserWithEmailAndPassword(auth, input.email, input.password)
    .then(() => {
      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: input.name,
        });
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
      }
    })
    .catch((error) => {
      input.name = "";
      input.email = "";
      input.password = "";
      input.passwordConfirm = "";
      error.value = true;
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

section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;

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
    }

    input {
      padding: $padding;
      width: $input-width;
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
