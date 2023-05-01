<template>
  <section>
    <HeaderComponent>{{ username }}</HeaderComponent>
    <nav>
      <div @click="navigate('/editor')">New image</div>
      <img src="../assets/Octopus4.png" class="octologo" alt="octologo" />
      <div @click="navigate('/browser')">Browse images</div>
    </nav>
    <FooterComponent
      ><h2>
        Made by Nick Mikhnevich. Mini-Paint Innowise task #9
      </h2></FooterComponent
    >
  </section>
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import router from "@/router";
import { store } from "@/storage/user/userStorage";
import { Ref, ref } from "vue";
// import { Ref } from "vue";
// const username: Ref<string | null> = localStorage.getItem("user")
//   ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     JSON.parse(localStorage.getItem("user")!).name
//   : null;
const { userData } = store();
console.log(userData);
const username: Ref<string | null> = ref("");
const navigate = (path: string): void => {
  router.push(path);
};
</script>
<style scoped>
section {
  margin: auto;
  padding-top: 4em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
.octologo {
  width: 400px;
  margin-top: 1em;
}
nav {
  display: flex;
  flex-direction: row;
  gap: 3em;
  margin-top: 6em;
  margin-left: 3em;
  align-items: center;
  justify-content: center;
}
nav div {
  font-size: 2em;
  color: black;
  padding: 0.4em;
  border-radius: 8px;
  background-color: #fc9797;
  transition: all;
  transition-duration: 200ms;
  cursor: pointer;
}
nav div:hover {
  transform: scale(1.1);
  box-shadow: 10px 10px 2px 1px rgba(0, 0, 83, 0.2);
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 1em;
  background-color: aliceblue;
  font-size: 1em;
}
</style>
