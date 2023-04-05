<template>
  <v-card>
    <v-card-title>Enter Servers Details</v-card-title>
    <v-card-text>
      <v-expansion-panels>
        <v-expansion-panel
            v-for="(item, i) in hosts"
            :title="item.name"
            :key="i"
        >
          <v-expansion-panel-text>
            <v-form>
              <v-text-field
                  :counter="10"
                  label="Name"
                  required
                  v-model="item.name"
              ></v-text-field>
              <v-text-field
                  :counter="10"
                  label="Description"
                  required
                  v-model="item.description"
              ></v-text-field>
              <v-select
                  :items="['mdi-server', 'mdi-server-network', 'mdi-server-security']"
                  label="Icon"
                  v-model="item.icon"
                  :prepend-inner-icon="item.icon"
              >
              </v-select>
              <v-text-field
                  :counter="10"
                  label="Ip"
                  required
                  v-model="item.ip"
              ></v-text-field>
            </v-form>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

    </v-card-text>
    <v-card-actions>
      <v-btn
          color="#5777FA"
          @click="addServer">
        Add Server
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
// @ts-ignore
import dockerNames from "docker-names";
import {Host} from "@/models/Host";
import {ref} from "vue";

const emit = defineEmits(['update:modelValue'])

interface Props {
  modelValue: Array<Host>
}

let props = defineProps<Props>();

let hosts = ref(props.modelValue)

let placeholderHost: Host = {
  name: 'server name',
  description: 'server desc',
  ip: '',
  icon: 'mdi-server',
  status: undefined,
  id: undefined,
  services: []
}

const addServer = () => {
  let server = {...placeholderHost}
  server.name = dockerNames.getRandomName()
  hosts.value.push(server)
  updateModelValue()
}

const updateModelValue = () => {
  emit('update:modelValue', hosts.value)
}
</script>

<style scoped>

</style>
