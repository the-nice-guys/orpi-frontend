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
      </v-toolbar>

      <v-card-text>
        <v-form>
          <v-text-field
              :counter="10"
              label="Name"
              required
              v-model="infra.name"
          ></v-text-field>
          <v-text-field
              :counter="10"
              label="Description"
              required
              v-model="infra.description"
          ></v-text-field>
          <v-select
              :items="['mdi-cloud', 'mdi-cloud-outline']"
              label="Icon"
              v-model="infra.icon"
              :prepend-inner-icon="infra.icon"
          >
          </v-select>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useStore} from "vuex";
import {Infrastructure} from "@/models/Infrastructure";

const emit = defineEmits(['update:modelValue'])

let store = useStore()
let dialog = ref(false)

interface Props {
  modelValue: Infrastructure
}
const props = defineProps<Props>()

let infra = ref({...props.modelValue})

const openDialog = () => {
  dialog.value = true
}

const closeDialog = async () => {
  await store.dispatch('editInfra', {
    infrastructure_id: infra.value.infrastructure_id,
    name: infra.value.name,
    description: infra.value.description,
    icon: infra.value.icon,
  })
  updateModelValue()
  dialog.value = false
}

const updateModelValue = () => {
  emit('update:modelValue', infra.value)
}
</script>

<style scoped>

</style>
