<template>
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
</template>
<script setup lang="ts">
import { fetchCanvasesByCreator } from "@/scripts/utils/canvasFetchUtil";
import { debounce } from "@/scripts/utils/debouncer";
import { getKeys } from "@/scripts/utils/getKeysUtil";
import { Ref, ref } from "vue";

const isMobile = window.innerWidth < 768;
const LIMIT = isMobile ? 4 : 12;
const page: Ref<number> = ref(1);
const searchContent: Ref<string> = ref("");
const keys: Ref<string[]> = ref([]);
const pages: Ref<number | null> = ref(null);

fetchCanvasesByCreator(page.value, LIMIT).then((data) => {
  if (data) {
    pages.value = data;
  }
});

const handleNextPage = () => {
  page.value++;
  if (searchContent.value) {
    fetchCanvasesByCreator(page.value, LIMIT, keys.value);
  } else {
    fetchCanvasesByCreator(page.value, LIMIT);
  }
};
const handlePrevPage = () => {
  page.value--;
  if (searchContent.value) {
    fetchCanvasesByCreator(page.value, LIMIT, keys.value);
  } else {
    fetchCanvasesByCreator(page.value, LIMIT);
  }
};
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
