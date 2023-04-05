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
  LinearScale, ChartData,

} from 'chart.js';
import { Line } from 'vue-chartjs';
import zoomPlugin from 'chartjs-plugin-zoom'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    zoomPlugin,
);

interface Props {
  data: ChartData<'line'>,
  options: {
    responsive: boolean,
    maintainAspectRatio: boolean
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: boolean,
          },
          pinch: {
            enabled: boolean
          },
          mode: string,
        }
      }
    }
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
