<template>
  <v-card>
    <v-card-title>Enter Infrastructure Details</v-card-title>
    <v-card-text>
      <v-form>
        <v-container fluid>
          <v-row>
            <v-col
                cols="6">
              <v-text-field
                  :counter="10"
                  label="Infrastructure Name"
                  required
                  v-model="environment.name"
                  @input="updateModelValue"
              ></v-text-field>
              <v-text-field
                  :counter="10"
                  label="Infrastructure Description"
                  required
                  v-model="environment.description"
                  @input="updateModelValue"
              ></v-text-field>
            </v-col>

            <v-col>
              <v-select
                  :items="['mdi-cloud', 'mdi-cloud-outline']"
                  label="Icon"
                  v-model="environment.icon"
                  :prepend-inner-icon="environment.icon"
                  @input="updateModelValue"
              >
              </v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
// @ts-ignore
import dockerNames from 'docker-names'
import {Environment} from "@/models/Environment";
import {onMounted, onUnmounted, ref, Ref, toRef} from "vue";

const emit = defineEmits(['update:modelValue'])

interface Props {
  modelValue: Environment
}

let props = defineProps<Props>();

let environment = ref(props.modelValue)

onMounted(() => {
  if (!environment.value.name) {
    environment.value.name = dockerNames.getRandomName()
  }
})

onUnmounted(() => {
  environment.value = new Environment()
})

const updateModelValue = () => {
  emit('update:modelValue', environment.value)
}
</script>

<style scoped>

</style>
