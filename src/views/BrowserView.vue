<template>
  <CustomLoader
    v-if="
      !canvases.photos.value ||
      (canvases.photos.value.length === 0 && searchContent.length === 0)
    "
  />
  <div class="wrapper">
    <div class="post-head">
      <div>
        <img
          src="@/assets/left.png"
          alt="left"
          @click="handlePrevPage"
          v-if="page > 1"
        />
      </div>
      <input
        type="text"
        class="searchbar"
        placeholder="User email"
        v-model="searchContent"
        @input="handleSearch"
      />
      <div>
        <img
          src="@/assets/right.png"
          alt="right"
          @click="handleNextPage"
          v-if="pages && page <= pages"
        />
      </div>
    </div>
    <div
      v-if="canvases.photos.value?.length === 0 && searchContent.length !== 0"
      class="no-found"
    >
      Sorry, nothing was found
    </div>
    <div class="image-container">
      <div
        class="image-item"
        v-for="image in canvases.photos.value"
        :class="
          user.user.value?.email === image.metadata.uploadedBy
            ? 'your-images'
            : ''
        "
        :key="image.downloadUrl"
        :id="image.downloadUrl"
      >
        <RouterLink
          :to="{
            name: 'canvasDetails',
            params: {
              id: image.metadata.uploadedAt,
              context: image.metadata.canvasCtx,
              user: image.metadata.uploadedBy,
              name: image.name,
            },
          }"
          ><img :src="image.downloadUrl" alt="image" class="canvas-img" />
          <span>{{ image.metadata.uploadedBy }}</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomLoader from "@/components/CustomLoader.vue";
import { useImages } from "@/composables/useImages";
import { useUser } from "@/composables/useUser";
import { fetchCanvasesByCreator } from "@/scripts/utils/canvasFetchUtil";
import { debounce } from "@/scripts/utils/debouncer";
import { getKeys } from "@/scripts/utils/getKeysUtil";
import {
  PaginationInterface,
  UserDataCompos,
} from "@/types/interfaces/composInterfaces";
import { Ref, ref } from "vue";

const isMobile = window.innerWidth < 768;
const LIMIT = isMobile ? 4 : 12;
const page: Ref<number> = ref(1);
const canvases: PaginationInterface = useImages();
const searchContent: Ref<string> = ref("");
const user: UserDataCompos = useUser();
const keys: Ref<string[]> = ref([]);
const pages: Ref<number | null> = ref(null);
fetchCanvasesByCreator(page.value, LIMIT, keys.value).then((data) => {
  if (data) {
    pages.value = data;
  }
});
const handleNextPage = () => {
  canvases.setCanvases([]);
  page.value++;
  if (searchContent.value) {
    fetchCanvasesByCreator(page.value, LIMIT, keys.value);
  } else {
    fetchCanvasesByCreator(page.value, LIMIT);
  }
};
const handlePrevPage = () => {
  canvases.setCanvases([]);
  page.value--;
  if (searchContent.value) {
    fetchCanvasesByCreator(page.value, LIMIT, keys.value);
  } else {
    fetchCanvasesByCreator(page.value, LIMIT);
  }
};
fetchCanvasesByCreator(page.value, LIMIT).then((data) => {
  if (data) {
    pages.value = data;
  }
});
const handleSearch = debounce(() => {
  getKeys(searchContent.value).then((data) => {
    if (!data) return;
    keys.value = data;
    fetchCanvasesByCreator(page.value, LIMIT, keys.value).then((data) => {
      if (data) pages.value = data;
    });
  });
}, 300);
</script>

<style scoped lang="scss">
@mixin for-phone {
  @media (max-width: 599px) {
    @content;
  }
}
.wrapper {
  .no-found {
    margin-top: 2em;
    padding: 0.7em;
    background-color: rgba(255, 129, 129, 0.401);
    border-radius: 8px;
    font-size: 2em;
  }
  .image-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.4em;
    padding: 1.3em;
    @include for-phone {
      grid-template-columns: repeat(1, 1fr);
    }
    .your-images {
      background-color: aquamarine;
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
