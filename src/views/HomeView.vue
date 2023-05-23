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
