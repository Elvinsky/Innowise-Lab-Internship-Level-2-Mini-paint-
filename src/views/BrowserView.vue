<template>
  <CustomLoader
    v-if="!canvases.photos.value || canvases.photos.value.length === 0"
  />
  <div class="wrapper">
    <div class="post-head">
      <!-- <div>
        <img src="@/assets/left.png" alt="left" @click="handlePrevPage" />
      </div> -->
      <input
        type="text"
        class="searchbar"
        placeholder="User email"
        v-model="searchContent"
        @input="handleSearch"
      />
      <div>
        <img src="@/assets/right.png" alt="right" @click="handleNextPage" />
      </div>
    </div>

    <div class="image-container">
      <div
        class="image-item"
        v-for="image in canvases.photos.value"
        :key="image.downloadUrl"
        :id="image.downloadUrl"
      >
        <RouterLink
          :to="{
            name: 'canvasDetails',
            params: {
              id: image.metadata.uploadedAt,
              url: image.downloadUrl,
              user: image.metadata.uploadedBy,
              name: image.name,
            },
          }"
          ><img
            :src="image.downloadUrl"
            alt="image"
            class="canvas-img"
            @click="handleOpenDetails(image.downloadUrl)"
          />
          <span>{{ image.metadata.uploadedBy }}</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomLoader from "@/components/CustomLoader.vue";
import { useImages } from "@/composables/useImages";
import {
  fetchCanvasesByCreator,
  fetchPaginatedCanvases,
} from "@/scripts/utils/canvasFetchUtil";
import { debounce } from "@/scripts/utils/debouncer";
import { PaginationInterface } from "@/types/interfaces/composInterfaces";
import { Ref, ref } from "vue";
import { useRouter } from "vue-router";
const isMobile = window.innerWidth < 768;
const LIMIT = isMobile ? 4 : 12;
const canvases: PaginationInterface = useImages();
const searchContent: Ref<string> = ref("");
const router = useRouter();
fetchPaginatedCanvases(LIMIT);
const handleOpenDetails = (url: string) => {
  const urlId = url.substring(8);
  router.push(`/canvas/${urlId}`);
};
const handleNextPage = () => {
  canvases.setCanvases([]);
  fetchPaginatedCanvases(LIMIT, canvases.pageTokenRef.value);
};
const handleSearch = debounce(() => {
  canvases.setCanvases([]);
  fetchCanvasesByCreator(LIMIT, searchContent.value);
}, 500);
</script>

<style scoped lang="scss">
@mixin for-phone {
  @media (max-width: 599px) {
    @content;
  }
}
.wrapper {
  .image-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.4em;
    padding: 1.3em;
    @include for-phone {
      grid-template-columns: repeat(1, 1fr);
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

      span {
        font-size: 1.1em;
      }

      .canvas-img {
        margin: 0.5em;
        width: 220px;
        height: 110px;
        @include for-phone {
          height: 95px;
          width: 200px;
        }
      }
    }
  }

  a {
    span {
      text-decoration: none;
      color: black;
    }
  }

  .searchbar {
    padding: 0.4em;
    font-size: 1em;
  }

  .post-head {
    margin-top: 0.5em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2em;

    img {
      width: 30px;
      cursor: pointer;
      transition: all 200ms;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
