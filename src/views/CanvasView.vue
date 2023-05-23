<template>
  <div class="wrapper">
    <CustomCanvas
      :isCreator="route.params.user === user.user.value?.email"
      :filename="route.params.name"
    />
  </div>
</template>

<script setup lang="ts">
import CustomCanvas from "@/components/CanvasComponents/CustomCanvas.vue";
import { useRoute } from "vue-router";
import { useUser } from "@/composables/useUser";
const route = useRoute();
const user = useUser();
</script>
