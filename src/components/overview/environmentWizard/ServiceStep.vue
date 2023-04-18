<template>
  <v-card>
    <v-card-title>Enter Services Details</v-card-title>
    <v-card-text>
      <v-expansion-panels>
        <v-expansion-panel
            v-for="(item, i) in services"
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
                  label="Server"
                  v-model="item.host"
                  :items="getHostNames()"
              >
              </v-select>
              <v-select
                  chips
                  closable-chips
                  multiple
                  label="Dependencies"
                  v-model="item.dependencies"
                  :items="getServicesNamesExcept(item)"
              >
                <template v-slot:selection="data">
                  <v-chip
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      close
                  >
                    {{ data.item.name }}
                  </v-chip>
                </template>
              </v-select>
            </v-form>

                <v-table>
                  <thead>
                  <tr>
                    <th class="text-left">
                      Option
                    </th>
                    <th class="text-left">
                      Value
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                      v-for="(opt) in item.options"
                      :key="opt.name"
                  >
                    <td>{{ opt.name }}</td>
                    <td>
                      <v-text-field
                          class="ma-2"
                          density="compact"
                          v-model="opt.value"
                      ></v-text-field>
                    </td>
                  </tr>
                  </tbody>
                </v-table>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

    </v-card-text>
    <v-card-actions>
      <v-btn
          color="#5777FA"
          @click="addService">
        Add service
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
// @ts-ignore
import dockerNames from "docker-names";
import {Service} from "@/models/Service";
import {Host} from "@/models/Host";
import {ref} from "vue";
import {Option} from "@/models/Option";

const emit = defineEmits(['update:modelValue'])

interface Props {
  hosts: Array<Host>
  modelValue: Array<Service>
}

let props = defineProps<Props>();

let placeholderService: Service = {
  ip: '',
  name: 'service name',
  description: 'service desc',
  host: '',
  dependencies: [],
  options: [],
  id: undefined
}

let placeholderNameOptions: Option = {
  id: undefined,
  name: 'name',
  type: 'string',
  value: 'name'
}

let placeholderImageOptions: Option = {
  id: undefined,
  name: 'image',
  type: 'string',
  value: 'docker-image'
}

let placeholderPortsOptions: Option = {
  id: undefined,
  name: 'ports',
  type: 'string',
  value: '4040:80'
}

let services = ref(props.modelValue)

const addService = () => {
  let service = {...placeholderService}
  service.options = [{...placeholderImageOptions}, {...placeholderPortsOptions}, {...placeholderNameOptions}]
  service.name = dockerNames.getRandomName()
  services.value.push(service)
  updateModelValue()
}

const getServicesNamesExcept = (service: Service) => {
  return services.value.filter(x => x.name !== service.name).map(x => x.name)
}

const getHostNames = () => {
  return props.hosts.map(x => x.name)
}

const updateModelValue = () => {
  emit('update:modelValue', services.value)
}

</script>

<style scoped>

</style>
