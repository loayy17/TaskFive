<template>
  <div>
    <v-table :data="your_json" :schema="json_schema" />
    <v-table :data="your_json_cars" :schema="json_schema_cars" />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import vTable from './components/vTable.vue';





const your_json = ref([])
const your_json_cars = ref([])

const json_schema = {
  columns: ['id', 'first_name', 'last_name', 'email', 'gender', 'ip_address'],
}
const json_schema_cars = {
  columns: ['id', 'car_make', 'car_model_year', 'car_vin'],
}
onMounted(async ()=>{
   const response = await axios('MOCK_DATA.json')
   your_json.value = await response.data
   const responseCars = await axios('MOCK_DATA (1).json')
   your_json_cars.value = await responseCars.data
   
  })
</script>

<style scoped>

</style>