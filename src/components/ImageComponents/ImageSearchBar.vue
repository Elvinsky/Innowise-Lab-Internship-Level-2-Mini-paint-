<template>
  <div class="post-head">
    <div>
      <img
        src="@/assets/left.png"
        alt="left"
        @click="handlePrevPage"
        v-show="images.page.value > 1"
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
        v-show="
          images.totalPages.value &&
          images.page.value <= images.totalPages.value
        "
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { fetchCanvasesByCreator } from "@/scripts/utils/canvasFetchUtil";
import { debounce } from "@/scripts/utils/debouncer";
import { getKeys } from "@/scripts/utils/getKeysUtil";
import { Ref, ref } from "vue";
import { useImages } from "@/composables/useImages";
const searchContent: Ref<string> = ref("");
const keys: Ref<string[]> = ref([]);
const images = useImages();

const handleNextPage = () => {
  images.setPage(images.page.value + 1);
  if (searchContent.value) {
    fetchCanvasesByCreator(images.page.value, images.limit.value, keys.value);
  } else {
    fetchCanvasesByCreator(images.page.value, images.limit.value);
  }
};
const handlePrevPage = () => {
  images.setPage(images.page.value - 1);
  if (searchContent.value) {
    fetchCanvasesByCreator(images.page.value, images.limit.value, keys.value);
  } else {
    fetchCanvasesByCreator(images.page.value, images.limit.value);
  }
};
const handleSearch = debounce(() => {
  getKeys(searchContent.value).then((data) => {
    if (!data) return;
    keys.value = data;
    fetchCanvasesByCreator(
      images.page.value,
      images.limit.value,
      keys.value
    ).then((data) => {
      if (data) images.setTotalPages(data);
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
</style>
