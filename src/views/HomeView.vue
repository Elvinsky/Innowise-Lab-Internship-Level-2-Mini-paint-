<template>
  <div class="wrapper">
    <div class="home-block">
      <div @click="navigate('/editor')">New image</div>
      <img src="../assets/Octopus4.png" class="octologo" alt="octologo" />
      <div @click="navigate('/browser')">Browse images</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
const navigate = (path: string): void => {
  router.push(path);
};
</script>
<style scoped lang="scss">
@mixin for-phone {
  @media (max-width: 599px) {
    @content;
  }
}
.wrapper {
  .octologo {
    width: 400px;
    margin-top: 1em;
  }

  .home-block {
    display: flex;
    flex-direction: row;
    gap: 3em;
    margin-top: 5em;
    margin-left: 3em;
    align-items: center;
    justify-content: center;
    @include for-phone {
      flex-direction: column;
      align-items: center;
      width: 300px;
    }

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
</style>
