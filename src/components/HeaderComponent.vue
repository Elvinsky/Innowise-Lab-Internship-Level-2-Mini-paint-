<template>
  <header>
    <img
      src="@/assets/return.png"
      alt="back"
      class="back-btn"
      @click="handleGoBack"
      v-if="isHome !== '/'"
    />
    <h1>Welcome to</h1>
    <h1><span>INNODRAW</span></h1>
    <h1>{{ user.user.value ? user.user.value.displayName : "undefined" }}</h1>
    <img
      src="@/assets/user.png"
      alt="back"
      class="user-btn"
      @click="handleLogOut"
    />
  </header>
</template>
<script setup lang="ts">
import { useUser } from "@/composables/useUser";
import router from "@/router";
import { UserDataCompos } from "@/types/interfaces/composInterfaces";
import { computed } from "vue";
import { useRoute } from "vue-router";
const user: UserDataCompos = useUser();
const route = useRoute();
const isHome = computed(() => {
  return route.path;
});
function handleGoBack() {
  router.push("/");
}
function handleLogOut() {
  user.setUser(null);
  router.push("/login");
}
</script>
<style scoped lang="scss">
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3em;
  position: sticky;
  box-sizing: border-box;
  top: 0;
  width: 100%;
  padding: 1em;
  font-size: 1.4em;
  background-color: aliceblue;

  img {
    width: 30px;
    height: 30px;
  }

  h1 {
    align-self: center;
    justify-self: center;
  }

  .back-btn,
  .user-btn {
    width: 30px;
    transition: all;
    transition-duration: 200ms;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }

  span {
    letter-spacing: 8px;
    color: rgba(249, 73, 73, 255);
  }
}
</style>
