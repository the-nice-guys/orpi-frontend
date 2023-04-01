<template>
  <v-dialog
      fullscreen
      scrollable
      :scrim="false"
      transition="dialog-bottom-transition"
      v-model="dialog"
  >
    <template v-slot:activator="{ props }">
      <v-btn
          color="#5777FAFF"
          v-bind="props"
          @click="openDialog"
      >
        <span class="text-white">Add Environment</span>
      </v-btn>
    </template>

    <v-card>
      <v-toolbar
          color="#5777FAFF"
          flat
      >
        <v-btn icon @click="closeDialog">
          <v-icon class="text-white">mdi-close</v-icon>
        </v-btn>

        <v-toolbar-title class="text-white">Create New Environment</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="closeDialog">
          <v-icon class="text-white">mdi-check</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <Wizard
            squared-tabs
            :custom-tabs="tabs"
            :nextButton="nextButton"
            @change="onChangeTab"
            @complete:wizard="wizardCompleted"
        >

          <EnvironmentStep
              v-if="currentTabIndex === 0"
              v-model="environment"
          ></EnvironmentStep>

<!--          <ConfigureServersStep-->
<!--              v-if="currentTabIndex === 1"-->
<!--              v-model="hosts"-->
<!--          />-->

<!--          <ConfigureServicesStep-->
<!--              v-if="currentTabIndex === 2"-->
<!--              v-model="servicesX"-->
<!--              :hosts="hosts"-->
<!--          />-->

        </Wizard>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
// @ts-ignore
import Wizard from 'form-wizard-vue3'
import 'form-wizard-vue3/dist/form-wizard-vue3.css'
import EnvironmentStep from "@/components/overview/environmentWizard/EnvironmentStep.vue";
import {Environment} from "@/models/Environment.js";
import {ref} from "vue";
import {computed} from "vue";
import {Host} from "@/models/Host.js";
import {Service} from "@/models/Service.js";
import * as inspector from "inspector";

let dialog = ref(false)
let tabs = [
  {
    title: 'Configure Environment',
    icon: 'cloud'
  },
  {
    title: 'Configure Servers',
    icon: 'server'
  },
  {
    title: 'Configure Services',
    icon: 'box'
  }
]
let currentTabIndex = ref<Number>(0);

let environment = ref<Environment>({
  id: 0,
  name: '',
  description: '',
  icon: '',
  hosts: Array.of<Host>()
})
let hosts = ref<Array<Host>>([])
let services = ref<Array<Service>>([])

let nextButton = computed(() => {
  switch (currentTabIndex.value) {
    case 0:
      return {
        text: 'Configure hosts',
        icon: 'arrow-right'
      }
    case 1:
      return {
        text: 'Configure services',
        icon: 'arrow-right'
      }
    default:
      return {
        text: 'Done',
        icon: 'check'
      }
  }
})

const openDialog = () => {
  environment.value.name = ''
  environment.value.description = ''
  environment.value.icon = 'mdi-cloud'
  hosts.value = []
  services.value = []

  dialog.value = true
  currentTabIndex.value = 0
}

const closeDialog = () => {
  dialog.value = false
}

const onChangeTab = (index: any) => {
  if (index.value !== undefined) {
    currentTabIndex.value = index.value;
    return;
  }
  currentTabIndex.value = index
}

const wizardCompleted = () => {
  console.log('Wizard Completed');
  buildInfrastructureModel();
  closeDialog();
}

const buildInfrastructureModel = () => {
  environment.value.hosts = hosts.value;
  environment.value.hosts.forEach(x => {
    x.services = services.value.filter(service => service.host === x.name).map(service => structuredClone(service))
  });
  console.log(environment.value);
}

</script>

<style scoped>

</style>
