<template>
  <Line :data="props.data" :options="options" class="chart"/>
</template>

<script lang="ts" setup>
import { ref, onMounted, toRefs } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale
);

interface Props {
  data: {
    labels: Array<string>,
    datasets: Array<unknown>
  },
  options: {
    responsive: boolean,
    maintainAspectRatio: boolean
  }
}

const props = defineProps<Props>()
const options = props.options
</script>

<style scoped>
  .chart {
    width: 700px;
    height: 500px;
    background-color: white;
  }
</style>
