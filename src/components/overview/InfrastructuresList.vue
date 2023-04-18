<template>
  <v-card
      elevation="2"
      min-width="300"
      height="100%"
      style="border-radius: 24px"
  >
    <v-card-title>Infrastructures</v-card-title>

    <div class="text-center ma-4" v-if="!store.state.loaded">
      <v-progress-circular color="#5777FA" indeterminate :size="94"></v-progress-circular>
    </div>

    <v-list
        :selected="[props.selectedEnvironment ? props.selectedEnvironment.name : '']"
        v-else
    >
      <v-list-item
          v-for="item in props.environments"
          :key="item.name"
          :value="item.name"
          @click="selectEnvironment(item)"
          active-color="#5777FAFF"

      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <template v-slot:prepend>
          <v-icon icon="mdi-plus"></v-icon>
        </template>
        <CreateEnvironmentDialog/>
      </v-list-item>
    </v-list>

  </v-card>
</template>

<script lang="ts" setup>
import {Infrastructure} from "@/models/Infrastructure";
import {useStore} from "vuex";
import {defineEmits} from "vue";
import CreateEnvironmentDialog from "@/components/overview/environmentWizard/CreateEnvironmentDialog.vue";
const emit = defineEmits(['select-environment'])

interface Props {
  environments: Infrastructure[],
  selectedEnvironment: Infrastructure
}

let props = defineProps<Props>();
let store = useStore();

const selectEnvironment = (item: Infrastructure) => {
  emit('select-environment', item)
}

</script>

<style scoped>

</style>
