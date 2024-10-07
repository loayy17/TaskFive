<template>
  <div>
    <h1
      class="text-center mt-10 bg-gray-300 mx-auto w-28 rounded animate-bounce"
    >
      Welcome To Home Page
    </h1>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import pagination from "./components/Pagination.vue";

const route = useRoute();
const numOfPage = ref(route.query.numOfPage || 0);
watch(
  () => route.query.numOfPage,
  (newTableNum) => {
    numOfPage.value = Number(newTableNum) || 0;
  }
);
</script>
<style scoped></style>
