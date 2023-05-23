<template>
  <div class="image-item" :id="props.image.downloadUrl">
    <RouterLink
      :to="{
        name: 'canvasDetails',
        params: {
          id: props.image.metadata.uploadedAt,
          context: props.image.metadata.canvasCtx,
          user: props.image.metadata.uploadedBy,
          name: props.image.name,
        },
      }"
    >
      <figure>
        <img
          :src="props.image.downloadUrl"
          alt="user-image"
          class="canvas-img"
        />
        <figcaption class="naming">
          {{ props.image.metadata.uploadedBy }}
        </figcaption>
      </figure>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps(["image"]);
</script>

<style scoped lang="scss">
@mixin for-phone {
  @media (max-width: 599px) {
    @content;
  }
}

.image-item {
  border-radius: 5px;
  background-color: rgba(240, 73, 249, 0.118);
  border: 1px solid rgba(0, 0, 0, 0.314);
  cursor: pointer;
  transition: all 200ms;

  &:hover {
    transform: scale(1.1);
    box-shadow: 4px 4px 2px 1px rgba(91, 91, 91, 0.2);
  }

  .naming {
    font-size: 1.1em;
    width: 100%;
  }

  .canvas-img {
    margin: 0.5em;
    width: 300px;
    height: 130px;
    @include for-phone {
      height: 95px;
      width: 200px;
    }
  }
}

a {
  text-decoration: none;
  .naming {
    color: black;
  }
}
</style>
