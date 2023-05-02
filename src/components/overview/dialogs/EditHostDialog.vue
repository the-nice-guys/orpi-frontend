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
          size="x-medium"
          color="#5777FAFF"
          icon="mdi-pencil"
          variant="text"
          v-bind="props"
          @click="openDialog"
      >
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

        <v-toolbar-title class="text-white">Edit Host Information</v-toolbar-title>

        <v-btn icon @click="closeDialog">
          <v-icon class="text-white">mdi-check</v-icon>
        </v-btn>

      </v-toolbar>

      <v-card-text>
        <v-form>
          <v-text-field
              :counter="10"
              label="Name"
              required
              v-model="host.name"
          ></v-text-field>
          <v-text-field
              :counter="10"
              label="Description"
              required
              v-model="host.description"
          ></v-text-field>
          <v-select
              :items="['mdi-server', 'mdi-server-network', 'mdi-server-security']"
              label="Icon"
              v-model="host.icon"
              :prepend-inner-icon="host.icon"
          >
          </v-select>
          <v-text-field
              :counter="10"
              label="Ip"
              required
              v-model="host.ip"
          ></v-text-field>
        </v-form>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {Host} from "@/models/Host";
import {useStore} from "vuex";

const emit = defineEmits(['update:modelValue'])
let store = useStore()

interface Props {
  modelValue: Host
}

const props = defineProps<Props>()

let host = ref({...props.modelValue})

let dialog = ref(false)

const openDialog = () => {
  dialog.value = true
}

const closeDialog = async () => {
  await store.dispatch('editHost', {
    host_id: host.value.host_id,
    name: host.value.name,
    description: host.value.description,
    icon: host.value.icon,
    ip: host.value.ip
  })
  updateModelValue()
  dialog.value = false
}

const updateModelValue = () => {
  emit('update:modelValue', host.value)
}
</script>

<style scoped>

</style>
