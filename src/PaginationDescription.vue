<template>
    <div>
        <h1 class="m-3 rounded bg-gray-100 flex justify-center">Pagination</h1>
        <div class="flex justify-around">
            <div >
                <h3>First &#8676;</h3>
                <h3>Previous Page &#8606;</h3>
                <h3>Previous Current Index &#8592;</h3>
            </div>
            <div>
                <h1>Three Props </h1>
                <ul>
                    <li>1- total Number of records : <span class="text-green-800">num-of-record</span>
                    </li>
                    <li>2- Numbers Of Buttons : <span class="text-green-800">number-of-btns</span></li>
                    <li>3- Number of Rows Per Page: <span class="text-green-800">page-size</span></li>
                </ul>
                <br>
                <h1>One Emit</h1>
                <ul>
                    <li>1-Receive Current Index <span class="text-green-800">@current-index</span>
                    </li>
                </ul>
            </div>
            <div>
                <h3>&#8594; Next Current </h3>
                <h3>&#8608; Next Page </h3>
                <h3>&#8677; Last </h3>
            </div>
        </div>
        <Pagination :num-of-record="1000" :number-of-btns="5" :page-size="50"/>
        <div class="text-center text-red-700"> Total Number Must be complication of PageSize</div>
        <hr class="mb-4">
        <div class="text-center">
            <h1>Three Props </h1>
                <ul>
                    <li>1- total Number of records : <span class="text-green-800">25</span>
                    </li>
                    <li>2- Numbers Of Buttons : <span class="text-green-800">5</span></li>
                    <li>3- Number of Rows Per Page: <span class="text-green-800">2</span></li>
                </ul>
            </div>
        <Pagination :num-of-record="25" :number-of-btns="5" :page-size="2"/>

        <hr class="mb-4">
        <div class="text-center">
            <h1>Three Props </h1>
                <ul>
                    <li>1- total Number of records : <span class="text-green-800">100</span>
                    </li>
                    <li>2- Numbers Of Buttons : <span class="text-green-800">2</span></li>
                    <li>3- Number of Rows Per Page: <span class="text-green-800">10</span></li>
                </ul>
            </div>
        <Pagination :num-of-record="100" :number-of-btns="2" :page-size="10" />

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Pagination from './components/Pagination.vue';

const PageSize = ref(10);
const numOfTables = ref(100);

</script>

<style scoped>

</style>