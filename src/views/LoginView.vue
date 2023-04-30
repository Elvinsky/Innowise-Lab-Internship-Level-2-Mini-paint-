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
      <div v-if="error">Error! Incorrect creds</div>
      <div class="actions">
        <button @click="submit">Login</button>
        <RouterLink to="/registration" class="link">
          Noe yet have an account?
        </RouterLink>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import router from "@/router";
import { loginQuery } from "@/scripts/dbScripts/queries";
import { UserInput, UserWithId } from "@/types/interfaces";
import { Ref, reactive, ref } from "vue";

const input: UserInput = reactive({
  email: "",
  password: "",
});
const error: Ref<boolean> = ref(false);

const submit = (): void => {
  loginQuery(input.email, input.password).then((data) => {
    if (data.length !== 1) {
      error.value = true;
      input.email = "";
      input.password = "";
      return;
    } else {
      const dataToSet: UserWithId = {
        name: data[0].name,
        email: data[0].email,
        password: data[0].password,
        id: data[0].id,
      };
      localStorage.setItem("user", JSON.stringify(dataToSet));
      router.push("/home");
    }
  });
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
form.error input {
  border-color: red;
  border-width: 1px;
  border-style: solid;
}
form button {
  align-self: flex-start;
  justify-self: start;
  background-color: rgba(18, 219, 18, 0.4);
  padding: 0.4em 0.6em 0.4em 0.6em;
  border-radius: 5px;
  font-size: 0.9em;
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
