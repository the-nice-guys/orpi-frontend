<template>
  <main class="Dashboard" id="main">
    <v-sheet
        class="bg-sheet"
        color="#5777FAFF"
        height="18%"
        width="100%"
    >
    </v-sheet>
    <v-container fluid style="z-index: 3; position: inherit;">
      <v-row justify="end">
        <account-cloud class="ma-2 mr-16 elevation-2" style="position: inherit"/>
      </v-row>
      <v-row class="mt-8" justify="start">
        <v-col>
          <v-card
              elevation="2"
              min-width="300"
              height="50%"
              class="mb-4"
              style="border-radius: 24px"
          >
            <v-card-title>Environment & Services</v-card-title>

            <div class="pa-4">
              <v-select
                  :items="store.getters.environments"
                  item-title="title"
                  item-value="value"
                  label="Environment"
                  density="comfortable"
                  v-model="selectedEnvironment"
              ></v-select>

              <v-select
                  :items="getServices()"
                  item-title="title"
                  item-value="value"
                  label="Service"
                  density="comfortable"
                  v-model="selectedService"
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
              <v-tab value="one">CPU</v-tab>
              <v-tab value="two">Network</v-tab>
              <v-tab value="three">Memory</v-tab>
            </v-tabs>

            <v-card-text>
              <v-window v-model="tab">
                <v-window-item value="one">
                  <LineChart :data="chartData" :options="chartOpts"/>
                </v-window-item>

                <v-window-item value="two">

                </v-window-item>

                <v-window-item value="three">

                </v-window-item>
              </v-window>
            </v-card-text>

          </v-card>
        </v-col>
      </v-row>

      <v-row>
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
import {Environment} from "@/models/Environment";
import {Service} from "@/models/Service";
import {Action} from "@/models/Action";
import {Host} from "@/models/Host";
import * as chartConfig from '../chartConfig'
import {ChartData} from "chart.js";
import LineChart from "@/components/LineChart.vue";

let store = useStore()

let selectedEnvironment = ref<Environment>()
let selectedService = ref<Service>()
let tab = ref<Number>(0)

let chartOpts = ref(chartConfig.options)
let chartData = ref<ChartData<'line'>>({
  datasets: []
})

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
let interval: NodeJS.Timer
onMounted(() => {
  chartData.value = chartConfig.randomData()
  interval = setInterval(() => {
    let value = {...chartData.value}
    let dataset = [...value.datasets[0].data]
    // @ts-ignore
    let labels = [...value.labels]
    labels.push(Date.now())
    dataset.push(chartConfig.getRandomInt())

    if (dataset.length > 10) {
      labels.shift()
      dataset.shift()
    }
    chartData.value = {
      labels: labels,
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#5777FAFF',
          borderColor: '#5777FAFF',
          data: dataset
        }
      ]
    }
  }, 2000)
})

onUnmounted(() => {
  clearInterval(interval)
})

const getServices = () => {
  let services: { title: string | undefined; value: Service; }[] = []

  let env = selectedEnvironment.value
  if (!env) {
    return []
  }
  console.log(env)
  env.hosts.forEach((host: Host) => {
    host.services.forEach((service: Service) => {
      services.push({
        title: service.name,
        value: service
      })
    })
  })
  console.log(services)
  return services
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
  overflow: scroll;
}
</style>
