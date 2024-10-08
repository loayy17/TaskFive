<template>
  <div>
    <v-table :page-size="9" :data="your_json" :schema="json_schema" :current-index="currentIndex" @total-filter-data="setNumOfRecord"/>
    <footer class="flex justify-center flex-wrap mt-3">
      <pagination :num-of-record="numOfData" :page-size="9" :number-of-btns="5" @current-index="setIndex"/>
    </footer>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import vTable from "./components/VTable.vue";
import { onMounted, ref, watch } from "vue";
import pagination from "./components/Pagination.vue";

const currentIndex = ref(1)
const your_json = ref([]);
const numOfData = ref(your_json.value.length)
const json_schema = {
  columns: ["id", "first_name", "last_name", "email", "gender", "ip_address"],
};

const setIndex = (newIndex :number) => {
  currentIndex.value = newIndex.value
}
const setNumOfRecord = (newTotal :number) => {
  numOfData.value = newTotal
}

onMounted(async () => {
  const response = await axios("MOCK_DATA.json");
  your_json.value = await response.data;
  numOfData.value = your_json.value.length;
});
</script>

<style scoped></style>
