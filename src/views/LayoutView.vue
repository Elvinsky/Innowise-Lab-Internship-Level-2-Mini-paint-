<template>
  <HeaderComponent />
  <section>
    <RouterView />
  </section>
  <FooterComponent />
</template>
<script setup lang="ts">
import HeaderComponent from "@/components/UI/PageSegments/HeaderComponent.vue";
import FooterComponent from "@/components/UI/PageSegments/FooterComponent.vue";
</script>
<style scoped lang="scss">
@mixin for-phone {
  @media (max-width: 599px) {
    @content;
  }
}
@mixin for-tablet {
  @media (max-width: 750px) {
    @content;
  }
}
section {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  margin-bottom: 5em;
  margin-top: 7em;
  @include for-phone {
    overflow-x: hidden;
    align-items: center;
    justify-content: center;
  }
}
</style>
