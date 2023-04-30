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
import { isValidCreds } from "@/scripts/utils/utils";
import { isUniqueUser } from "@/scripts/utils/utils";
import { setItem } from "@/scripts/dbScripts/crudApi";
import { reactive } from "vue";
import { Ref, ref } from "vue";
import { UserData, UserDataToSet } from "@/types/interfaces";
import router from "@/router";

const user: UserData = reactive({
  name: "",
  email: "",
  password: "",
  repPassword: "",
});
let error: Ref<boolean> = ref(false);
const submit = (): void => {
  if (isValidCreds(user)) {
    isUniqueUser(user.name).then((response) => {
      if (response) {
        const userBackup: UserDataToSet = {
          name: user.name,
          email: user.email,
          password: user.password,
        };
        localStorage.setItem("user", JSON.stringify(userBackup));
        setItem("users", userBackup).then(() => router.push("/login"));
      }
    });
  } else {
    (user.name = ""),
      (user.email = ""),
      (user.password = ""),
      (user.repPassword = "");
    error.value = true;
    return;
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
}
form {
  display: inherit;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6em;
}
form button {
  align-self: flex-start;
  justify-self: start;
  background-color: rgba(18, 219, 18, 0.4);
  padding: 0.4em 0.6em 0.4em 0.6em;
  border-radius: 5px;
  font-size: 0.9em;
}
form.error input {
  border-color: red;
  border-width: 1px;
  border-style: solid;
}
input {
  padding: 0.4em;
  width: 200px;
}
.actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
}
.link {
  font-size: 0.7em;
}
</style>
