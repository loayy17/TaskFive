<template>
  <div>
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
    <div class="flex justify-start">
      <select class="border p-2 rounded-md shadow-sm shadow-gray-300 focus:bg-gray-200" name="Col" id="col">
        <option value="Select" selected>Select</option>
        <option v-for="col in schema.columns" :value="col">{{ col }}</option>
      </select>
      <input class="flex-grow border p-2 rounded-md shadow-sm shadow-gray-300 focus:bg-gray-200" type="text" />
    </div>
    <table class="table-fixed w-full">
      <thead>
        <tr>
          <th class="w-5">
            <input type="checkbox" name="filterBy" id="filterBy" />
          </th>
          <th v-for="col in schema['columns']" class="text-lg">{{ col }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in itemsPerPage"
          :key="index"
          class="border-t-2"
        >
          <td><input type="checkbox" /></td>
          <td
            v-for="col in schema['columns']"
            :key="col"
            class="p-2 flex-shrink border border-gray-300 overflow-auto"
          >
            <div v-if="row.isEditing">
              <input
                type="text"
                v-model="row[col]"
                :placeholder="col"
                class="bg-gray-200 rounded text-gray-500"
              />
            </div>
            <div v-else>
              <div>{{ row[col] }}</div>
            </div>
          </td>
          <td class="flex p-3 ml-2">
            <button>
              <Pencil
                class="p-1 mr-2 rounded-lg bg-gray-100 hover:bg-gray-200"
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
</template>

<script setup lang="ts">
// Imports
import { computed, ref, watch } from "vue";
import { Pencil, Trash2 } from "lucide-vue-next";
import { useRoute } from "vue-router";
import DataShared from "./DataShared";
import type { ITab } from "@/types";

// Props & Emits
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  schema: {
    type: Object,
    required: true,
  },
});

// Declaration Var Let Const &Refs
const route = useRoute(); // use route to extract query paramsfrom url 
const currentPage = ref<Number>(DataShared.value.currentPage);
const dataFromParent = ref<Array<Object>>(
  [...props.data].map((item) => ({ ...item, isEditing: false }))
);
const numItemsPerPage = ref<Number>(Math.ceil(DataShared.value.pageSize));
// const selectColumn = ref<String>("Select"); // this for select Filter By
const currentTap = ref<String>("All");
// const inputSearch = ref<String>(""); // this for search Field

const tabs: ITab[] = [
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

// Computed
const itemsPerPage = computed((): Array<Object> => {
  const startIndex: number = (currentPage.value - 1) * numItemsPerPage.value;
  return dataFromParent.value.slice(
    startIndex,
    startIndex + numItemsPerPage.value
  );
});


const changeTab = (tab: ITab) => {
  currentTap.value = tab;
};

//Watchers
watch(
  () => props.data,
  (newData) => {
    dataFromParent.value = newData.map(
      (el: Object | any) => ({ ...el, isEditinig: false }),
      { immediate: true }
    );
  }
);
watch(
  [() => route.query.maxLengthOFTables, () => dataFromParent.value.length],
  (newLength) => {
    if (newLength[0] !== undefined && !isNaN(newLength[0])) {
      DataShared.value.numOfTables = newLength[0];
    } else {
      DataShared.value.numOfTables =
        dataFromParent.value.length / numItemsPerPage.value;
    }
  }
);

watch(
  () => DataShared.value.currentPage,
  (newValue) => {
    currentPage.value = newValue;
  },
  { immediate: true }
);

// watch(
//   () => inputSearch.value,
//   (newInput) => {
//     const filteredDataFromParent = dataFromParent.value.filter((el) => {
//       const columnValue = el[selectColumn.value] == 'select'|| el[selectColumn.value] == 'id'?el[selectColumn.value] == 'id'.toString().toLowerCase() || '':el[selectColumn.value].toString().toLowerCase() || '';
//       return columnValue.includes(newInput.toLowerCase());
//     });
//     dataFromParent.value = filteredDataFromParent;
//   }
// );

// const visiblePageNumbers = computed(() => {
//   const totalPages = numOfTables.value;
//   let pageNumbers = [];
//   if (numOfTables.value <= 6) {
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(i);
//     }
//   } else {
//     if (currentPage.value <= 3) {
//       pageNumbers = [1, 2, 3, 4, 5, "...", totalPages];
//     } else if (currentPage.value >= totalPages - 2) {
//       pageNumbers = [
//         1,
//         "...",
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
//         totalPages,
//       ];
//     }
//   }
//   return pageNumbers;
// });
// const numOfTables = computed(() =>
//   Math.ceil(filterDataTable.value.length / numItemsPerPage.value)
// );
// const filterDataTable = computed(() => {
//   currentPage.value = 1;
//   return dataFromParent.value.filter((item) =>
//     item[selectColumn.value]
//       .toLowerCase()
//       .includes(serachEnter.value.toLowerCase())
//   );
// });
// const serachEnter = ref("");
// const nextArrow = ref(true);
// const previousArrow = ref(false);

// const deleteItem = (index: number) => {
//   const actualIndex = (currentPage.value - 1) * numItemsPerPage.value + index;
//   dataFromParent.value.splice(actualIndex, 1);
//   if (currentPage.value > numOfTables.value) {
//     currentPage.value = numOfTables.value;
//   }
// };
// const editItem = (index: number) => {
//   const actualIndex = (currentPage.value - 1) * numItemsPerPage.value + index;
//   dataFromParent.value[actualIndex].isEditing =
//     !dataFromParent.value[actualIndex].isEditing;
// };
// watch(
//   [() => filterDataTable.value, () => currentPage.value],
//   ([NewfilterData, newCurrent]) => {
//     console.log(NewfilterData.length)
//     if (currentPage.value == 1 && NewfilterData.length >= 11) {
//       nextArrow.value = true;
//       previousArrow.value = false;
//     } else if ( NewfilterData.length >= 11  && newCurrent >= 1) {
//       previousArrow.value = true;
//       nextArrow.value = false;
//     } else if (NewfilterData.length <= 10) {
//       nextArrow.value = false;
//       previousArrow.value = false;
//     } else {
//       previousArrow.value = true;
//       nextArrow.value = true;
//     }
//   }
// );
</script>

<style scoped></style>
