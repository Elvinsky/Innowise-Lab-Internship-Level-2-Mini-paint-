<template>
  <div class="wrapper">
    <div class="home-block">
      <CustomButton :custom-action="() => navigate('/editor')" :class="'home'"
        >New image</CustomButton
      >
      <img src="../assets/Octopus4.png" class="octologo" alt="octologo" />
      <CustomButton :custom-action="() => navigate('/browser')" :class="'home'"
        >Browse images</CustomButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/UI/FormComponents/CustomButton.vue";
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
  }
}
</style>
