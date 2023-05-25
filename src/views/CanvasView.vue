<template>
  <div class="wrapper">
    <ToolBar />
    <CustomCanvas />
  </div>
</template>

<script setup lang="ts">
import CustomCanvas from "@/components/CanvasComponents/CustomCanvas.vue";
import ToolBar from "@/components/CanvasComponents/ToolBar.vue";
</script>
<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1em;
  margin-top: 1em;
}
</style>
