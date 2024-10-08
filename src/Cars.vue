<template>
  <div>
    <v-table :data="your_json_cars" :schema="json_schema_cars" :page-size="10" :current-index="currentIndex" @total-filter-data="setNumOfRecord"/>
    <pagination :num-of-record="numOfData" :page-size="9" :number-of-btns="5" @current-index="setIndex"/>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import vTable from "./components/VTable.vue";
import Pagination from "./components/Pagination.vue";
import { onMounted, ref } from "vue";

const currentIndex = ref(1)
const your_json_cars = ref([]);
const numOfData = ref(your_json_cars.value.length)
const json_schema_cars = {
  columns: ["id", "car_make", "car_model_year", "car_vin"],
};

const setIndex = (newIndex :number) => {
  currentIndex.value = newIndex.value
}
const setNumOfRecord = (newTotal :number) => {
  numOfData.value = newTotal
}
onMounted(async () => {
  const responseCars = await axios("MOCK_DATA (1).json");
  your_json_cars.value = await responseCars.data;
  numOfData.value = your_json_cars.value.length
});
</script>

<style scoped></style>
