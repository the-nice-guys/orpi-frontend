<template>
  <main class="Dashboard" id="main">
    <v-sheet
        class="bg-sheet"
        color="#5777FAFF"
        height="18%"
        width="100%"
    >
    </v-sheet>
    <v-container fluid class="my-0">
      <v-row justify="end">
        <account-cloud class="ma-2 mr-16 elevation-2"/>
      </v-row>
    </v-container>
    <v-container fluid style="z-index: 3; position: inherit;" class="scrollable">
      <v-row class="" justify="start">
        <v-col>
          <v-card
              elevation="2"
              min-width="300"
              height="50%"
              class="mb-4"
              style="border-radius: 24px"
          >
            <v-card-title>Infrastructures & Services</v-card-title>

            <div class="pa-4">
              <v-select
                  :items="store.getters.environments"
                  item-title="title"
                  item-value="value"
                  label="Infrastructure"
                  density="comfortable"
                  @update:modelValue="environmentSelected"
              ></v-select>

              <v-select
                  :items="getServices()"
                  item-title="title"
                  item-value="value"
                  label="Service"
                  density="comfortable"
                  v-model="selectedService"
                  @update:modelValue="serviceSelected"
              ></v-select>
            </div>
          </v-card>



          <v-card
              elevation="2"
              min-width="300"
              height="50%"
              style="border-radius: 24px">
            <v-card-title>Statistics</v-card-title>
            <div class="d-flex">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Uptime</v-list-item-title>
                    <v-list-item-subtitle>{{selectedService ? selectedService.name : 'Service not selected'}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Item 2</v-list-item-title>
                    <v-list-item-subtitle>Item 2 subtitle</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Item 3</v-list-item-title>
                    <v-list-item-subtitle>Item 3 subtitle</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Average Cpu Usage</v-list-item-title>
                    <v-list-item-subtitle>{{selectedService ? selectedService.avgCpu : 'Service not selected'}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Average Network Usage</v-list-item-title>
                    <v-list-item-subtitle>{{selectedService ? selectedService.avgNetwork : 'Service not selected'}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Average Memory Usage</v-list-item-title>
                    <v-list-item-subtitle>{{selectedService ? selectedService.avgNetwork : 'Service not selected'}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </v-card>
        </v-col>

        <v-col cols="8">
          <v-card
              elevation="2"
              min-width="300"
              height="103%"
              style="border-radius: 24px"
          >
            <v-card-title>Graph</v-card-title>
            <v-tabs
                v-model="tab"
            >
              <v-tab value="one">Overview</v-tab>
              <v-tab value="two">cpu</v-tab>
              <v-tab value="three">network</v-tab>
              <v-tab value="four">memory</v-tab>
            </v-tabs>

            <v-card-text>
              <v-window v-model="tab">
                <v-window-item value="one">
                  <VueApexCharts ref="chart" type="line" height="350" :options="apexOptions" :series="apexSeriesAll"/>
                </v-window-item>

                <v-window-item value="two">
                  <VueApexCharts ref="chart" type="line" height="350" :options="apexOptions" :series="apexSeriesCpu"/>
                </v-window-item>

                <v-window-item value="three">
                  <VueApexCharts ref="chart" type="line" height="350" :options="apexOptions" :series="apexSeriesNetwork"/>
                </v-window-item>

                <v-window-item value="four">
                  <VueApexCharts ref="chart" type="line" height="350" :options="apexOptions" :series="apexSeriesMemory"/>
                </v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col cols="8">
          <v-card
              elevation="2"
              min-width="300"
              height="100%"
              style="border-radius: 24px"
          >
            <v-card-title>Logs</v-card-title>

            <v-card-text>
              {{text}}
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="4">
          <actions
              :is-for-service="true"
              :selected-service="selectedService"
              v-bind:actions="actions"/>
        </v-col>
      </v-row>



    </v-container>
  </main>
</template>

<script lang="ts" setup>
import {useStore} from 'vuex';
import AccountCloud from '@/components/AccountCloud.vue'
import Actions from '@/components/Actions.vue'
import {onMounted, onUnmounted, ref} from "vue";
import {Infrastructure} from "@/models/Infrastructure";
import {Service} from "@/models/Service";
import {Action} from "@/models/Action";
import {Host} from "@/models/Host";
import VueApexCharts from "vue3-apexcharts";

let store = useStore()

let selectedEnvironment = ref<Infrastructure>()
let selectedService = ref<Service>()
let tab = ref<Number>(0)
let shouldUpdate = ref<Boolean>(true)

let text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n Donec dapibus, tellus eu viverra porttitor," +
    " magna nibh accumsan arcu, quis aliquet ipsum quam a massa.\n Donec at tellus purus.\n Nulla eget gravida nibh.\n" +
" Aliquam sodales eget lectus vel fermentum.\n Donec sodales semper lectus, vitae viverra turpis hendrerit eget.\n" +
" Phasellus scelerisque iaculis ullamcorper.\n Cras vitae libero sed diam elementum feugiat eget quis tellus.\n" +
" Integer sed eros accumsan, laoreet nisl consequat, convallis tellus.\n"

let actions: Array<Action> = [
  {
    name: 'Start',
    icon: 'mdi-play',
    color: '#5777FAFF',
    action: (service: Service) => {
      console.log('starting of service: ' + service.name)
    }
  },
  {
    name: 'Stop',
    icon: 'mdi-stop',
    color: '#5777FAFF',
    action: () => {
      console.log('stop')
    }
  },
  {
    name: 'Restart',
    icon: 'mdi-restart',
    color: '#5777FAFF',
    action: () => {
      console.log('restart')
    }
  },
  {
    name: 'Delete',
    icon: 'mdi-delete',
    color: 'red',
    action: () => {
      console.log('delete')
    }
  },
  {
    name: 'Logs',
    icon: 'mdi-download',
    color: '#5777FAFF',
    action: () => {
      console.log('logs')
    }
  },
  {
    name: 'Backup',
    icon: 'mdi-download',
    color: '#5777FAFF',
    action: () => {
      console.log('backup')
    }
  },
]
let updateInterval: NodeJS.Timer
let clearingInterval: NodeJS.Timer
let cpuData: any[] = []
let networkData: any[] = []
let memoryData: any[] = []

onMounted(() => {
  updateInterval = setInterval(() => {
    if (selectedService.value && shouldUpdate.value) {
      let series = [...apexSeriesAll.value]
      let now = Date.now()
      series[0].data.push([now, Math.floor(Math.random() * (100 - 5 + 1)) + 5])
      series[1].data.push([now, Math.floor(Math.random() * (50 - 5 + 1)) + 5])
      series[2].data.push([now, Math.floor(Math.random() * (30 - 5 + 1)) + 5])
    }
  }, 1000)

  clearingInterval = setInterval(() => {
    apexSeriesAll.value[0].data = apexSeriesAll.value[0].data.slice(30)
    apexSeriesAll.value[1].data = apexSeriesAll.value[1].data.slice(30)
    apexSeriesAll.value[2].data = apexSeriesAll.value[2].data.slice(30)

    apexSeriesCpu.value[0].data = apexSeriesAll.value[0].data
    apexSeriesNetwork.value[0].data = apexSeriesAll.value[1].data
    apexSeriesMemory.value[0].data = apexSeriesAll.value[2].data


  }, 120000)
})

onUnmounted(() => {
  clearInterval(updateInterval)
  clearInterval(clearingInterval)
})

let chart = ref(null)

let apexSeriesAll = ref([
  {
    name: "cpu",
    data: cpuData
  },
  {
    name: "network",
    data: networkData
  },
  {
    name: "memory",
    data: memoryData
  }
])

let apexSeriesCpu = ref([
  {
    name: "cpu",
    data: cpuData
  }
])

let apexSeriesNetwork = ref([
  {
    name: "cpu",
    data: networkData
  }
])

let apexSeriesMemory = ref([
  {
    name: "cpu",
    data: memoryData
  }
])

let apexOptions = ref({
  chart: {
    id: 'realtime',
    type: 'area',
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
    stacked: false,
    height: 350,
    zoom: {
      type: 'x',
      enabled: false,
      autoScaleYaxis: true
    },
    toolbar: {
      autoSelected: 'pan'
    }
  },
  dataLabels: {
    enabled: false
  },
  markers: {
    size: 0,
  },
  stroke: {
    curve: 'smooth',
    width: 1.75
  },
  yaxis: {
    // labels: {
    //   formatter: function (val: any) {
    //     return (val / 1000000).toFixed(0);
    //   },
    // },
  },
  xaxis: {
    type: 'datetime',
    range: 60000
  },
  tooltip: {
    shared: false,
    x: {
      format: 'HH:mm:ss dd.MM.yy'
    },
    y: {
      formatter: function (val: any) {
        return val
      }
    }
  }
})

const toggle = () => {
  shouldUpdate.value = !shouldUpdate.value
  apexOptions.value = {
    xaxis: {
      // @ts-ignore
      range: shouldUpdate.value ? 30000 : undefined
    }
  }
}

const getServices = () => {
  let services: { title: string | undefined; value: Service; }[] = []

  let env = selectedEnvironment.value
  if (!env) {
    return []
  }
  //console.log(env)
  env.hosts.forEach((host: Host) => {
    host.services.forEach((service: Service) => {
      services.push({
        title: service.name,
        value: service
      })
    })
  })
  //console.log(services)
  return services
}

const environmentSelected = (item: Infrastructure) => {
  console.log(item)
  selectedEnvironment.value = item
  selectedService.value = item.hosts[0].services[0]
  clearSeries()
}

const serviceSelected = (item: Service) => {
  console.log(item)
  selectedService.value = item
  clearSeries()
}

const clearSeries = () => {
  apexSeriesAll.value[0].data.length = 0
  apexSeriesAll.value[1].data.length = 0
  apexSeriesAll.value[2].data.length = 0
}

</script>

<style scoped>
.bg-sheet {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
main {
  height: 100vh;
}
.scrollable {
  height: 85vh;
  overflow: scroll;
}
</style>
