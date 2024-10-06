<template>
  <div>
    <v-table :data="your_json"  :schema="json_schema" />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import vTable from "./components/vTable.vue";
import { onMounted, ref } from "vue";

onMounted(async () => {
  const response = await axios("MOCK_DATA.json");
  your_json.value = await response.data;
});
const your_json = ref([]);

const json_schema = {
  columns: ["id", "first_name", "last_name", "email", "gender", "ip_address"],
};


</script>

<style scoped></style>
