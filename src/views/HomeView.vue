<template>
  <div class="wrapper">
    <div class="home-block">
      <BaseButton :class="'home'" :onClick="() => navigate('/editor')"
        >New Image</BaseButton
      >
      <img src="../assets/Octopus4.png" class="octologo" alt="octologo" />
      <BaseButton :class="'home'" :onClick="() => navigate('/browser')"
        >Browse Images</BaseButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/BaseComponents/BaseButton.vue";
import router from "@/router";

const navigate = (path: string): void => {
  sessionStorage.removeItem("imgData");
  router.push(path);
};
</script>
<style scoped lang="scss">
@mixin for-phone {
  @media (max-width: 576px) {
    @content;
  }
}
@mixin for-tablet {
  @media (max-width: 768px) {
    @content;
  }
}
.wrapper {
  margin-top: 5em;
  @include for-phone {
    margin-bottom: 0em;
    margin-top: 0em;
  }
  .octologo {
    width: 400px;
    margin-top: 1em;
  }

  .home-block {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 3em;
    align-items: center;
    justify-content: center;
    @include for-phone {
      flex-direction: column;
    }
    @include for-tablet {
      flex-direction: column;
    }
  }
}
</style>
