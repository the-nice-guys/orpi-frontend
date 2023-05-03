<template>
  <main class="Overview">
    <v-sheet
        class="bg-sheet"
        color="#5777FAFF"
        height="18%"
        width="100%"
    >
    </v-sheet>
    <v-container fluid class="scrollable">
      <v-row justify="end">
        <account-cloud class="ma-2 mr-16 elevation-2"/>
      </v-row>

<!--      <v-row>-->
<!--        <v-col>-->
<!--          <v-card-->
<!--              style="border-radius: 24px;"-->
<!--          >-->
<!--            <v-card-text>-->
<!--              <v-container fluid class="ma-0 pa-0">-->
<!--                <v-row no-gutters>-->
<!--                  <v-col cols="2">-->
<!--                    <v-list-item>-->
<!--                      <template v-slot:prepend>-->
<!--                        <v-progress-circular color="#5777FAFF" model-value="83" :size="30"></v-progress-circular>-->
<!--                      </template>-->
<!--                      <v-list-item-title class="mx-4">Overall Load</v-list-item-title>-->
<!--                    </v-list-item>-->
<!--                  </v-col>-->

<!--                  <v-col cols="2">-->
<!--                    <v-list-item>-->
<!--                      <template v-slot:prepend>-->
<!--                        <v-badge color="#5777FAFF" :content="7" floating>-->
<!--                          <v-icon color="#5777FAFF" icon="mdi-bell"></v-icon>-->
<!--                        </v-badge>-->
<!--                      </template>-->
<!--                      <v-list-item-title class="mx-4">Notifications</v-list-item-title>-->
<!--                    </v-list-item>-->
<!--                  </v-col>-->

<!--                  <v-col cols="3">-->
<!--                    <v-list-item>-->
<!--                      <v-progress-linear-->
<!--                          model-value="87"-->
<!--                          color="#5777FAFF"-->
<!--                          height="12"-->
<!--                          rounded-->
<!--                          class="mb-2"-->
<!--                      >-->
<!--                        <template v-slot:default="{ value }">-->
<!--                          <strong v-bind:class="value > 50 ? 'text-white': ''">{{ Math.ceil(value) }}%</strong>-->
<!--                        </template>-->
<!--                      </v-progress-linear>-->
<!--                      <v-progress-linear-->
<!--                          model-value="20"-->
<!--                          color="#5777FAFF"-->
<!--                          height="12"-->
<!--                          rounded-->
<!--                      >-->
<!--                        <template v-slot:default="{ value }">-->
<!--                          <strong v-bind:class="value > 50 ? 'text-white': ''">{{ Math.ceil(value) }}%</strong>-->
<!--                        </template>-->
<!--                      </v-progress-linear>-->
<!--                    </v-list-item>-->
<!--                  </v-col>-->
<!--                </v-row>-->
<!--              </v-container>-->
<!--            </v-card-text>-->
<!--          </v-card>-->
<!--        </v-col>-->
<!--      </v-row>-->

      <v-row class="" justify="start">
        <v-col cols="4" xs12 md6 lg6 xl4>
          <EnvironmentsList
              v-on:select-environment="selectEnvironment"
              :environments="store.state.environments"
              :selected-environment="selectedEnvironment"/>
        </v-col>

        <v-col cols="4" xs12 md6 lg6 xl4 >
          <HostsList
              :selected-environment="selectedEnvironment"
              v-on:select-host="selectHost"
          />
        </v-col>
        <v-col>
          <ServicesList
              :host="selectedHost"
              v-on:select-service="selectService"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <actions
              :is-for-service="false"
              :selected-environment="selectedEnvironment"
              v-bind:actions="actions"/>
        </v-col>

        <v-col cols="4">
          <v-card
            elevation="2"
            style="border-radius: 24px"
          >
            <v-card-title>
              Info of <span style="color: #5777FA">{{selectedHost ? selectedHost.name : ''}}</span>
            </v-card-title>

            <v-card-text>
              <v-list
                density="compact"
              >
                <v-list-item>
                  <v-list-item-title>Ip</v-list-item-title>
                  <v-list-item-subtitle>{{selectedHost ? selectedHost.ip : ''}}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Status</v-list-item-title>
                  <v-list-item-subtitle>{{selectedHost ? selectedHost.status === 0 ? 'Online' : 'Offline' : ''}}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card
              elevation="2"
              style="border-radius: 24px"
          >
            <v-card-title>
              Options of <span style="color: #5777FA">{{selectedService ? selectedService.name : ''}}</span>
            </v-card-title>

            <v-card-text>
              <v-list
                  max-height="110"
                  density="compact"
              >
                <v-list-item
                  v-for="(item, i) in (selectedService ?  selectedService.options : [])"
                  :key="i"
                >
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.value }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-card
            style="border-radius: 24px; height: 100%"
          >
            <v-card-title>
              Scripts for <span v-if="selectedEnvironment" style="color: #5777FA">{{selectedEnvironment.name}}</span>
            </v-card-title>

            <v-list>
              <v-list-item
                  v-for="item in scripts"
                  :key="item.name"
                  :value="item.name"
                  active-color="#5777FAFF"
              >
                <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
                </template>
                <template v-slot:append>
                  <v-btn
                      color="#5777FAFF"
                      icon="mdi-play"
                      variant="text"
                  >
                  </v-btn>
                </template>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-plus"></v-icon>
                </template>
                <v-btn color="#5777FAFF">
                  <span class="text-white">Add Script</span>
                </v-btn>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="8">
          <InfrastructureHistory :infrastructure="selectedEnvironment"/>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script lang="ts" setup>
import EnvironmentsList from '@/components/overview/InfrastructuresList.vue'
import InfrastructureHistory from '@/components/InfrastructureHistory.vue'
import HostsList from '@/components/overview/HostsList.vue'
import AccountCloud from '@/components/AccountCloud.vue'
import {useStore} from 'vuex';
import {ref} from "vue";
import {Infrastructure} from "@/models/Infrastructure";
import {onMounted} from "vue";
import {Host} from "@/models/Host";
import ServicesList from "@/components/overview/ServicesList.vue";
import {Action} from "@/models/Action";
import {Service} from "@/models/Service";
import Actions from "@/components/Actions.vue";

let store = useStore();

let environments = ref<Infrastructure[]>([]);
let selectedEnvIndex = 0;
let selectedEnvironment = ref<Infrastructure | undefined>();
let selectedHost = ref<Host | undefined>()
let selectedService = ref<Service | undefined>()

onMounted(async () => {
  while (!store.state.loggedIn) {
    await sleep(10);
  }
  if (store.state.environments.length === 0) {
    environments.value = await store.dispatch('getUserEnvironments')
  }
  selectedEnvironment.value = store.state.environments[selectedEnvIndex];
  // @ts-ignore
  selectedHost.value = selectedEnvironment.value.hosts[0];
  selectedService.value = selectedHost.value?.services[0];

  store.dispatch('getHistory', {
    infraId: selectedEnvironment.value?.infrastructure_id,
    take: 3
  })
});

let scripts: Array<any> = [
  {
    name: "Lorem Script",
    icon: "mdi-script"
  },
  {
    name: "Ipsum Script",
    icon: "mdi-script-outline"
  },
  {
    name: "Dolor Script",
    icon: "mdi-semantic-web"
  }
]

let actions: Array<Action> = [
  {
    name: 'Start',
    icon: 'mdi-play',
    color: '#5777FAFF',
    action: async (env: Infrastructure, snackbar: any) => {
      let result = await store.dispatch('startEnvironment', {
        Infrastructure: env
      });
      if (result) {
        snackbar.show.value = true;
        snackbar.color.value = 'green';
        snackbar.text.value = 'Infrastructure has been started!';
      } else {
        snackbar.show.value = true;
        snackbar.color.value = 'red';
        snackbar.text.value = 'Something went wrong during startup';
      }
    }
  },
  {
    name: 'Stop',
    icon: 'mdi-stop',
    color: '#5777FAFF',
    action: async (env: Infrastructure, snackbar: any) => {
      let result = await store.dispatch('stopEnvironment', {
        Infrastructure: env
      });
      if (result) {
        snackbar.show.value = true;
        snackbar.color.value = 'green';
        snackbar.text.value = 'Infrastructure has been stopped!';
      } else {
        snackbar.show.value = true;
        snackbar.color.value = 'red';
        snackbar.text.value = 'Something went wrong during shutdown';
      }
    }
  },
  {
    name: 'Deploy',
    icon: 'mdi-upload',
    color: '#5777FAFF',
    action: async (env: Infrastructure, snackbar: any) => {
      let result=  await store.dispatch('deployEnvironment', {
        Infrastructure: env
      });
      if (result) {
        snackbar.show.value = true;
        snackbar.color.value = 'green';
        snackbar.text.value = 'Infrastructure has been deployed!';
      } else {
        snackbar.show.value = true;
        snackbar.color.value = 'red';
        snackbar.text.value = 'Something went wrong during deployment';
      }
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
    action: async (env: Infrastructure, snackbar: any) => {
      console.log(snackbar)
      snackbar.show.value = true;
      snackbar.color.value = 'green';
      snackbar.text.value = 'lorem';
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

const selectEnvironment = (environment: Infrastructure) => {
  selectedEnvironment.value = environment;
  selectedHost.value = environment.hosts[0]
  selectedService.value = environment.hosts[0].services[0]
  let payload = {
    infraId: selectedEnvironment.value?.infrastructure_id,
    take: 3
  }
  console.log(payload)
  store.dispatch('getHistory', payload)
}

const selectHost = (item: Host) => {
  selectedHost.value = item;
  selectedService.value = item.services[0]
}

const selectService = (item: Service) => {
  selectedService.value = item;
}

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

</script>

<style scoped>
main {
  height: 100vh;
  overflow: scroll;
}
.scrollable {
  overflow: scroll;
}
.bg-sheet {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>
