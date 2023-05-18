<template>
  <header>
    <nav>
      <img
        src="@/assets/return.png"
        alt="back"
        class="back-btn"
        @click="handleGoBack"
        v-if="isHome !== '/'"
      />
      <h2 class="welcoming">Welcome to</h2>
      <h2><span>INNODRAW</span></h2>
      <h2>{{ user.user.value?.displayName }}</h2>
      <img
        src="@/assets/user.png"
        alt="back"
        class="user-btn"
        @click="handleLogOut"
      />
    </nav>
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
  router.go(-1);
}
function handleLogOut() {
  user.logOut();
}
</script>
<style scoped lang="scss">
@mixin for-phone {
  @media (max-width: 599px) {
    @content;
  }
}
header {
  position: sticky;
  box-sizing: border-box;
  top: 0;
  width: 100%;
  padding: 1em;
  font-size: 1.4em;
  background-color: rgb(164, 213, 255);
  @include for-phone {
    gap: 1.3em;
    justify-content: space-between;
  }
  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 3em;
  }
  img {
    width: 30px;
    height: 30px;
    @include for-phone {
      margin-left: 1em;
    }
  }

  h2 {
    align-self: center;
    justify-self: center;
  }
  .welcoming {
    @include for-phone {
      display: none;
    }
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
    @include for-phone {
      display: none;
    }
  }
}
</style>
