<template>
  <section>
    <nav>
      <div @click="navigate('/editor')">New image</div>
      <img src="../assets/Octopus4.png" class="octologo" alt="octologo" />
      <div @click="navigate('/browser')">Browse images</div>
    </nav>
  </section>
</template>

<script setup lang="ts">
import router from "@/router";
const navigate = (path: string): void => {
  router.push(path);
};
</script>
<style scoped lang="scss">
section {
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

    div {
      font-size: 2em;
      color: black;
      padding: 0.4em;
      border-radius: 8px;
      background-color: #fc9797;
      transition: all 200ms;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
        box-shadow: 10px 10px 2px 1px rgba(0, 0, 83, 0.2);
      }
    }
  }
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
