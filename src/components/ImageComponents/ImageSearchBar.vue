<template>
  <div class="searchline">
    <div>
      <img
        src="@/assets/left.png"
        alt="back"
        @click="handleScrollPage('back')"
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
        alt="forward"
        @click="handleScrollPage('fwd')"
        v-if="images && images.length === limit"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { fetchCanvasesByCreator } from "@/utils/fetchCanvasUtil";
import { debounce } from "@/utils/debouncer";
import { getKeys } from "@/utils/getKeysUtil";
import { Ref, ref } from "vue";
import { useImages } from "@/composables/useImages";
import { Direction } from "@/types/literals/literals";
const searchContent: Ref<string> = ref("");
const keys: Ref<string[]> = ref([]);
const { images, limit, page, setPage } = useImages();
const handleScrollPage = (direction: Direction) => {
  direction === "fwd" ? setPage(page.value + 1) : setPage(page.value - 1);
  if (searchContent.value) {
    fetchCanvasesByCreator(page.value, limit.value, keys.value);
  } else {
    fetchCanvasesByCreator(page.value, limit.value);
  }
};
const handleSearch = debounce(() => {
  getKeys(searchContent.value).then((data) => {
    if (!data) return;
    keys.value = data;
    fetchCanvasesByCreator(page.value, limit.value, keys.value);
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

.searchline {
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
