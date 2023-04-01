<template>
  <main class="Overview">
    <v-sheet
        class="bg-sheet"
        color="#5777FAFF"
        height="18%"
        width="100%"
    >
    </v-sheet>
    <v-container fluid>
      <v-row justify="end">
        <account-cloud class="ma-2 mr-16 elevation-2"/>
      </v-row>
      <v-row class="mt-8" justify="start">
        <v-col xs12 md6 lg6 xl4 class="mb-4">
          <EnvironmentsList
              v-on:select-environment="selectEnvironment"
              :environments="store.state.environments"
              :selected-environment="selectedEnvironment"/>
        </v-col>

        <v-col cols="8" xs12 md6 lg6 xl4 >
          <v-row class="mb-2" no-gutters>
            <v-col  class="mx-2">
              <HostsList
                  :selected-environment="selectedEnvironment"
                  v-on:select-host="selectHost"
              />
            </v-col>
            <v-col class="mx-2">
              <ServicesList :host="selectedHost"/>
            </v-col>
          </v-row>

          <v-row class="ma-2" no-gutters>
<!--            <EnvHistory class="my-2"/>-->
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="8">
<!--          <EnvironmentInformation-->
<!--              :full-info-clicked="fullInfoClicked"-->
<!--              :open="true"-->
<!--              :selected-environment="selectedEnvironment"/>-->
        </v-col>

        <v-col>
<!--          <Actions/>-->
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script lang="ts" setup>
import EnvironmentsList from '@/components/overview/EnvironmentsList.vue'
import HostsList from '@/components/overview/HostsList.vue'
import AccountCloud from '@/components/AccountCloud.vue'
import {useStore} from 'vuex';
import {ref} from "vue";
import {Environment} from "@/models/Environment";
import {onMounted} from "vue";
import {Host} from "@/models/Host";
import ServicesList from "@/components/overview/ServicesList.vue";

let store = useStore();

let environments = ref<Environment[]>([]);
let selectedEnvIndex = 0;
let selectedEnvironment = ref<Environment | undefined>();
let selectedHost = ref<Host | undefined>()

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
});

const selectEnvironment = (environment: Environment) => {
  selectedEnvironment.value = environment;
  selectedHost.value = environment.hosts[0]
}

const selectHost = (item: Host) => {
  selectedHost.value = item;
}

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

</script>

<style scoped>
.bg-sheet {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>
