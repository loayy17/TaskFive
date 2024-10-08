<template>
  <div >
    <div class="flex justify-center flex-wrap mt-3">
      <button
        :disabled="currentPage == 1"
        @click="changePage(1)"
        :class="{
          ' items-center w-7 h-7 rounded-full border-2 border-orange-400 bg-white text-black font-bold overflow-hidden mx-1': true,
          'bg-gray-400': currentPage == 1,
        }"
      >
        &#8676;
      </button>
      <button
        :disabled="pageNumber == 1"
        @click="changePageNumber('previous')"
        :class="{
          ' items-center w-7 h-7 rounded-full border-2 border-orange-400 bg-white text-black font-bold overflow-hidden mx-1': true,
          'bg-gray-400': pageNumber == 1,
        }"
      >
        &#8606;
      </button>
      <button
        :disabled="currentPage == 1"
        @click="changePage(currentPage - 1)"
        :class="{
          ' items-center w-7 h-7 rounded-full border-2 border-orange-400 bg-white text-black font-bold overflow-hidden mx-1': true,
          'bg-gray-400': currentPage == 1,
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
          'bg-gray-400': currentPage == numOfTables,
        }"
      >
        &#8594;
      </button>
      <button
        :disabled="currentPage == Math.ceil(props.numOfRecord/props.pageSize)"
        @click="changePageNumber('next')"
        :class="{
          ' items-center w-7 h-7 rounded-full border-2 border-orange-400 bg-white text-black font-bold': true,
          'bg-gray-400':currentPage == Math.ceil(props.numOfRecord/props.pageSize),
        }"
      >
        &#8608;
      </button>
      <button
        :disabled="currentPage == Math.ceil(props.numOfRecord/props.pageSize)"
        @click="changePage(numOfTables)"
        :class="{
          ' items-center w-7 h-7 rounded-full border-2 border-orange-400 bg-white text-black font-bold': true,
          'bg-gray-400': currentPage == Math.ceil(props.numOfRecord/props.pageSize),
        }"
      >
        &#8677;
      </button>
    </div>
    <div class="text-center">
    <input
      v-model="currentPage"
      type="number" min="1" :max="numOfTables"
      class=" rounded shadow shadow-black m-3 text-center"
    /></div>
  </div>
</template>

<script setup lang="ts">
//imports
import { computed, ref, watch, type Ref } from "vue";

//Emits &Props
const props = defineProps({
  numOfRecord: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
  numberOfBtns: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(['currentIndex'])
const numOfTables = ref((Math.ceil(props.numOfRecord/props.pageSize))) as Ref<number>;
const currentPage = ref(1)
const pageNumber = ref(1) as Ref<number>;
const numberOfBtns = ref(props.numberOfBtns) as Ref<number>;
// computed
const visiblePageNumbers = computed(() => { // Computed To Fill Paginations With Numbers
  const pagination = []; 
  const start = numberOfBtns.value * (pageNumber.value - 1) + 1;
  const end = Math.min(numOfTables.value, numberOfBtns.value * pageNumber.value);
  if (numOfTables.value > 0) {
    for (let i = start; i <= end; i++) {
      pagination.push(i);
    }
  }
  return pagination;
});
// Methods
const changePage = (page :number) => { // Method to Change CurrentPage 
  if (
    currentPage.value == pageNumber.value * numberOfBtns.value &&
    page > currentPage.value
  ) {
    pageNumber.value++;
    currentPage.value = page;
  } else if (
    page == (pageNumber.value - 1) * numberOfBtns.value &&
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
const changePageNumber = (page : String) => { // Methods when Press Next aroow and Prevous
  if (page == "next") {
    pageNumber.value++;
    currentPage.value = pageNumber.value * numberOfBtns.value - numberOfBtns.value + 1;
  } else if (page == "previous") {
    pageNumber.value--;
    currentPage.value = pageNumber.value * numberOfBtns.value - numberOfBtns.value + 1;
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
      pageNumber.value = Math.ceil(newCurrent / numberOfBtns.value);
    }
    currentPage.value = newCurrent;
    emit('currentIndex',currentPage)
  }
);

// Just for input from parent
watch(()=>props,(newProps)=>{
  currentPage.value = 1
  numOfTables.value = Math.ceil(props.numOfRecord/props.pageSize)
  numberOfBtns.value = newProps.numberOfBtns
},{immediate:true,deep:true})
</script>

<style scoped></style>
