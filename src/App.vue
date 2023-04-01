<template>
  <LineChart :data="data" :options="options"/>
</template>

<script lang="ts" setup>
import {ref, onMounted, onUnmounted} from 'vue';
import LineChart from "./components/LineChart.vue";
import * as chartConfig from './chartConfig.js'
import {ChartData} from "chart.js";

const data = ref<ChartData<'line'>>({
  datasets: [],
});


const options = chartConfig.options
let interval = -1
onMounted(() => {
  data.value = chartConfig.randomData()
  interval = setInterval(() => {
    data.value = chartConfig.randomData();
    console.log('updated')
  }, 2000);
});

onUnmounted(() => {
  clearInterval(interval)
})

</script>
