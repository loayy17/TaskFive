<template>
    <div>
        <v-table :data="your_json_cars"  :schema="json_schema_cars" />
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import vTable from './components/vTable.vue';
import { onBeforeMount, ref } from 'vue';
const your_json_cars = ref([]);
const json_schema_cars = {
  columns: ["id", "car_make", "car_model_year", "car_vin"],
};

onBeforeMount(async () => {
const responseCars = await axios("MOCK_DATA (1).json");
  your_json_cars.value = await responseCars.data;
});

</script>

<style scoped>

</style>