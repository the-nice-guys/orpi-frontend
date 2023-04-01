<template>
  <v-card
      elevation="2"
      style="border-radius: 24px"
      height="100%">
    <v-card-title>Services of <span style="color: #5777FA">{{props.host ? props.host.name : ''}}</span></v-card-title>

    <div class="text-center ma-4" v-if="store.getters.environments.length === 0">
      <v-progress-circular color="#5777FA" indeterminate :size="94"></v-progress-circular>
    </div>

    <div v-else>
      <div class="ma-2 chips">
        <v-chip
            class="ma-1"
            v-for="(item, i) in (props.host ? props.host.services : [])"
            :key="i"
            color="#5777FA"
            variant="outlined"
            prepend-icon="mdi-server"
        >
          <span>{{item.name}}</span>
        </v-chip>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import {useStore} from "vuex";
import {Host} from "@/models/Host";

let store = useStore();

interface Props {
  host: Host
}

const props = defineProps<Props>();

</script>

<style scoped>

</style>
