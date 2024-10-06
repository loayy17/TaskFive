<template>
  <div>
    <nav>
      <nav
        class="font-medium text-center text-gray-500 border-b border-gray-200 mb-4"
      >
        <ul class="flex flex-wrap -mb-px">
          <li v-for="tab in tabs" :key="tab.key">
            <button
              @click="changeTab(tab.label)"
              :class="{
                'p-4 border-b-2': true,
                'border-y-transparent': currentTap != tab.label,
                'border-b-blue-600 text-blue-600': currentTap == tab.label,
              }"
            >
              {{ tab.label }}
            </button>
          </li>
        </ul>
      </nav>
      <div class="max-w-md flex">
        <select v-model="selectColumn">
          <option value="Filter By" selected disabled>Filter By</option>
          <option v-for="col in schema['columns']" :value="col">
            {{ col }}
          </option>
        </select>
        <div
          class="mx-auto relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden"
        >
          <div class="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            v-model="serachEnter"
            class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search record"
          />
        </div>
      </div>
    </nav>

    <table class="table-fixed w-full">
      <thead>
        <tr>
          <th class="w-5">
              <input type="checkbox" name="filterBy" id="filterBy"/>
          </th>
          <th v-for="col in schema['columns']" class="text-lg">{{ col }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in data"
          :key="index"
          class="border-t-2 "
        >
          <td><input class="underline" type="checkbox"/></td>
          <td
            v-for="col in schema['columns']"
            :key="col"
            class="p-2 flex-shrink border border-gray-300 overflow-auto"
          >
            <div v-if="row.isEditing">
              <input type="text" v-model="row[col]" :placeholder="col" class="bg-gray-200 rounded text-gray-500"/>
            </div>
            <div v-else>
              <div>{{ row[col] }}</div>
            </div>
          </td>
          <td class="flex p-3 ml-2">
            <button>
              <Pencil 
                class="p-1 mr-2 rounded-lg bg-gray-100 hover:bg-gray-200 "
              />
            </button>
            <button>
              <Trash2
                class="p-1 mr-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- 
  <footer>
    <div
      class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
    >
      <div class="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >Previous</a
        >
        <a
          href="#"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >Next</a
        >
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{
              currentPage * numItemsPerPage + 1 - numItemsPerPage
            }}</span>
            to
            <span class="font-medium">{{ currentPage * numItemsPerPage }}</span>
            of
            <span class="font-medium">{{ filterDataTable.length }}</span>
            results
          </p>
        </div>
        <div>
          <nav
            class="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              @click="changePage(currentPage - 1)"
              href="#"
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span class="sr-only">Previous</span>
              <svg
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <button
              v-for="(number, index) in visiblePageNumbers"
              :key="index"
              @click="changePage(number)"
              class=""
              :class="{
                'relative inline-flex items-center px-4 py-2  ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 text-sm font-semibold z-10 bg-indigo-600 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600':
                  currentPage == number,
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                  currentPage != number,
              }"
            >
              <div>{{ number }}</div>
            </button>
            <button
              @click="changePage(currentPage + 1)"
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span class="sr-only">Next</span>
              <svg
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  </footer> -->
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Pencil, Trash2 } from "lucide-vue-next";

const props = defineProps({
  data: Array,
  schema: Object,
});
const emit = defineEmits(["dataFromParent"]);
// const currentPage = ref(1);
// const numItemsPerPage = ref(10);
// const dataFromParent = ref(
//   [...props.data].map((item) => ({ ...item, isEditing: false }))
// );

const selectColumn = ref(props.schema["columns"][1]);
const serachEnter = ref("");
const currentTap = ref("All");
// const showEdit = ref(false);
const tabs = [
  {
    key: "All",
    label: "All",
  },
  {
    key: "Ongoing",
    label: "Ongoing",
  },
  {
    key: "Completed",
    label: "Completed",
  },
];

// const numOfTables = computed(() =>
//   Math.ceil(filterDataTable.value.length / numItemsPerPage.value)
// );
// const filterDataTable = computed(() => {
//   return dataFromParent.value.filter((item) =>
//     item[selectColumn.value]
//       .toLowerCase()
//       .includes(serachEnter.value.toLowerCase())
//   );
// });
// const changePage = (page) => {
//   if (page >= 1 && page <= numOfTables.value) {
//     currentPage.value = page;
//   }
// };
const changeTab = (tab) => {
  currentTap.value = tab;
};

// const itemsPerPage = computed(() => {
//   const startIndex = (currentPage.value - 1) * numItemsPerPage.value;
//   console.log(filterDataTable.value);
//   return filterDataTable.value.slice(
//     startIndex,
//     startIndex + numItemsPerPage.value
//   );
// });
// const visiblePageNumbers = computed(() => {
//   let pageNumbers = [];
//   if (numItemsPerPage.value <= 6) {
//     for (let i = 1; i <= Math.ceil(filterDataTable.value.length / 10); i++) {
//       pageNumbers.push(i);
//     }
//     console.log(pageNumbers);
//   } else {
//     if (currentPage.value < 3) {
//       pageNumbers = [1, 2, 3, 4, 5, "...", numOfTables.value];
//     } else if (currentPage.value >= numOfTables.value - 3) {
//       pageNumbers = [
//         1,
//         "...",
//         numOfTables.value - 4,
//         numOfTables.value - 3,
//         numOfTables.value - 2,
//         numOfTables.value - 1,
//         numOfTables.value,
//       ];
//     } else {
//       pageNumbers = [
//         1,
//         "...",
//         currentPage.value - 1,
//         currentPage.value,
//         currentPage.value + 1,
//         "...",
//         numOfTables.value,
//       ];
//     }
//   }
//   return pageNumbers;
// });
// const deleteItem = (index: number) => {
//   dataFromParent.value = dataFromParent.value.filter((item, i) => i !== index);
// };
// const editItem = (index: number) => {
//   dataFromParent.value[index].isEditing = !dataFromParent.value[index].isEditing;
// };
</script>

<style scoped></style>
