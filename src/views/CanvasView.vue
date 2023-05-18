<template>
  <div class="wrapper">
    <CustomCanvas
      :isCreator="route.params.user === auth.currentUser?.email"
      :filename="route.params.name"
    />
  </div>
</template>

<script setup lang="ts">
import { auth } from "@/firebase";
import CustomCanvas from "@/components/CanvasComponents/CustomCanvas.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
