<template>
  <div class="flex justify-center flex-wrap mt-3">
    <div>
      <button
        :disabled="currentPage == 1"
        @click="changePage(1)"
        :class="{
          ' items-center w-7 h-7 rounded-full border-2 border-orange-400 bg-white text-black font-bold overflow-hidden mx-1': true,
          'bg-gray-600': currentPage == 1,
        }"
      >
        &#8676;
      </button>
      <button
        :disabled="pageNumber == 1"
        @click="changePageNumber('previous')"
        :class="{
          ' items-center w-7 h-7 rounded-full border-2 border-orange-400 bg-white text-black font-bold overflow-hidden mx-1': true,
          'bg-gray-600': pageNumber == 1,
        }"
      >
        &#8606;
      </button>
      <button
        :disabled="currentPage == 1"
        @click="changePage(currentPage - 1)"
        :class="{
          ' items-center w-7 h-7 rounded-full border-2 border-orange-400 bg-white text-black font-bold overflow-hidden mx-1': true,
          'bg-gray-600': currentPage == 1,
        }"
      >
        &#8592;
      </button>
      <button
        v-for="(page, index) in visiblePageNumbers"
        :key="index"
        @click="changePage(page)"
        :class="{
          'items-center w-7 h-7 rounded-full border-2 border-orange-400 bg-white text-black font-serif overflow-hidden mx-1':
            currentPage != page,
          'items-center w-7 h-7 rounded-full border-2 border-white bg-orange-400 text-white font-serif overflow-hidden mx-1':
            currentPage == page,
        }"
      >
        {{ page }}
      </button>
      <button
        :disabled="currentPage == numOfTables"
        @click="changePage(currentPage + 1)"
        :class="{
          ' items-center w-7 h-7 rounded-full border-2 border-orange-400 bg-white text-black font-bold': true,
          'bg-gray-600': currentPage == numOfTables,
        }"
      >
        &#8594;
      </button>
      <button
        :disabled="pageNumber == numOfTables / pageSize"
        @click="changePageNumber('next')"
        :class="{
          ' items-center w-7 h-7 rounded-full border-2 border-orange-400 bg-white text-black font-bold': true,
          'bg-gray-600': pageNumber == numOfTables / pageSize,
        }"
      >
        &#8608;
      </button>
      <button
        :disabled="pageNumber == numOfTables / pageSize"
        @click="changePage(numOfTables)"
        :class="{
          ' items-center w-7 h-7 rounded-full border-2 border-orange-400 bg-white text-black font-bold': true,
          'bg-gray-600': pageNumber == numOfTables / pageSize,
        }"
      >
        &#8677;
      </button>
    </div>
    <input
      v-model="currentPage"
      type="text"
      class="rounded shadow shadow-black ml-3 text-center"
    />
  </div>
</template>

<script setup lang="ts">
//imports
import { computed, ref, watch } from "vue";
import DataShared from "./DataShared";
//Emits &Props
const emit = defineEmits(["currentPage"]);
const numOfTables = ref(DataShared.value.numOfTables);
const currentPage = ref(DataShared.value.currentPage);
const pageNumber = ref(1);
const pageSize = ref(DataShared.value.pageSize);
// computed
const visiblePageNumbers = computed(() => { // Computed To Fill Paginations With Numbers
  if (numOfTables.value >= pageSize.value * pageNumber.value) {
    const pagination = [];
    for (
      let i = 1 + pageSize.value * (pageNumber.value - 1);
      i <= pageSize.value * pageNumber.value;
      i++
    ) {
      pagination.push(i);
    }
    return pagination;
  }
});
// Methods
const changePage = (page) => { // Method to Change CurrentPage 
  if (
    currentPage.value == pageNumber.value * pageSize.value &&
    page > currentPage.value
  ) {
    pageNumber.value++;
    currentPage.value = page;
  } else if (
    page == (pageNumber.value - 1) * pageSize.value &&
    page < currentPage.value
  ) {
    pageNumber.value--;
    currentPage.value = page;
  } else if (page >= 1 && page < numOfTables.value) {
    currentPage.value = page;
  } else if (page < 1) {
    currentPage.value = 1;
  } else if (page >= numOfTables.value) {
    currentPage.value = numOfTables.value;
  }
};
const changePageNumber = (page) => { // Methods when Press Next aroow and Prevous
  if (page === "next") {
    pageNumber.value++;
    currentPage.value = pageNumber.value * pageSize.value - pageSize.value + 1;
  } else if (page === "previous") {
    pageNumber.value--;
    currentPage.value = pageNumber.value * pageSize.value - pageSize.value + 1;
  }
};
//Watchers
watch( // watch any Change in CurrentPage to use input with vallidation
  () => currentPage.value,
  (newCurrent) => {
    if (newCurrent > numOfTables.value) {
      currentPage.value = 100;
    } else if (newCurrent < 1) {
      currentPage.value = 1;
    } else {
      pageNumber.value = Math.ceil(newCurrent / pageSize.value);
    }
    DataShared.value.currentPage = newCurrent;
  }
);
watch( // watch numOfData THat received and send between Siblings
  () => DataShared.value.numOfTables,
  (newValue) => {
    numOfTables.value = newValue;
  },
  { immediate: true, deep: true }
);
</script>

<style scoped></style>
