<template>
  <v-card
      elevation="2"
      style="border-radius: 24px"
      min-width="300"
      height="100%">
    <v-card-title>Hosts of <span style="color: #5777FA">{{props.selectedEnvironment ? props.selectedEnvironment.name : ''}}</span> </v-card-title>

    <div class="text-center ma-4" v-if="!store.state.loaded">
      <v-progress-circular color="#5777FA" indeterminate :size="94"></v-progress-circular>
    </div>

    <v-list
        :selected="[props.selectedEnvironment ? props.selectedEnvironment.hosts[0].name : '']"
        v-else
    >
      <v-list-item
          v-for="item in (props.selectedEnvironment ? props.selectedEnvironment.hosts : [])"
          :key="item.name"
          :value="item.name"
          @click="selectHost(item)"
          active-color="#5777FAFF"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon" v-bind:class="item.status === 0 ? 'online' : 'offline'"></v-icon>
        </template>
        <template v-slot:append="{ isActive }">
          <EditHostDialog v-if="isActive"
                          :modelValue="item"
                          @update:modelValue="newValue => editHost(item, newValue)"
          />
        </template>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts" setup>
import {useStore} from "vuex";
import {Infrastructure} from "@/models/Infrastructure";
import {Host} from "@/models/Host";
import EditHostDialog from "@/components/overview/dialogs/EditHostDialog.vue";

let store = useStore()
const emit = defineEmits(['select-host'])

interface Props {
  selectedEnvironment: Infrastructure
}

let props = defineProps<Props>();

console.log(props.selectedEnvironment)

const selectHost = (item: Host) => {
  emit('select-host', item)
}

const editHost = (currentValue: Host, newValue: Host) => {
  currentValue.name = newValue.name
  currentValue.icon = newValue.icon
  currentValue.ip = newValue.ip
  currentValue.description = newValue.description
}

</script>

<style scoped>

</style>
