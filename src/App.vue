<template>
  <div>
    <nav
      class="font-medium text-center text-gray-500 border-b border-gray-200 rounded-sm bg-gray-200"
    >
      <ul class="flex flex-wrap -mb-px">
        <router-link
          :to="tab.label"
          v-for="tab in tabs"
          @click="changeTab(tab.label)"
          :key="tab.key"
          :class="{
            'p-4 border-b-2': true,
            'border-y-transparent': currentTap !== tab.label,
            'border-b-blue-600 text-blue-600': currentTap === tab.label,
          }"
        >
          <div @click="changeTab(tab.label)">{{ tab.label }}</div>
        </router-link>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { useRouter } from "vue-router";


const router = useRouter()
const currentTap = ref("Home");
const tabs = [
  {
    key: "home",
    label: "Home",
  },
  {
    key: "Employees",
    label: "Employees",
  },
  {
    key: "Cars",
    label: "Cars",
  },
];


const changeTab = (tab: string) => {
  console.log(tab);
  currentTap.value = tab;
};

router.push(currentTap.value)
</script>

<style scoped></style>
