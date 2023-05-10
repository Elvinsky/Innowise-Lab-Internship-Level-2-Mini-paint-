<template>
  <section>
    <h2>Registration</h2>
    <form :class="error ? 'error' : ''" @submit.prevent>
      <input
        id="name"
        v-model="user.name"
        placeholder="username"
        name="name"
        type="text"
      />
      <input
        id="email"
        v-model="user.email"
        placeholder="e-mail"
        name="email"
        type="email"
      />
      <input
        id="password"
        v-model="user.password"
        placeholder="password"
        name="password"
        type="password"
      />
      <input
        id="repeatPassword"
        v-model="user.repPassword"
        placeholder="repeat password"
        name="repeatPassword"
        type="password"
      />
      <div v-if="error">Error! Incorrect creds</div>
      <div class="actions">
        <button @click="submit">Submit</button>
        <RouterLink to="/login" class="link">
          Already have an account?
        </RouterLink>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Ref, ref } from "vue";
import { UserData } from "@/types/interfaces/userInterfaces";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase";
import router from "@/router";

const user: UserData = reactive({
  name: "",
  email: "",
  password: "",
  repPassword: "",
});
let error: Ref<boolean> = ref(false);
const submit = (): void => {
  if (user.password !== user.repPassword) {
    error.value = true;
    user.name = "";
    user.email = "";
    user.password = "";
    user.repPassword = "";
    return;
  }
  createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(() => {
      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: user.name,
        });
        router.push("/login");
      }
    })
    .catch((error) => {
      user.name = "";
      user.email = "";
      user.password = "";
      user.repPassword = "";
      error.value = true;
    });
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
