<template>
  <v-card
      elevation="2"
      style="border-radius: 24px"
      class="pb-2"
  >
    <v-card-title>Actions for
      <span v-if="props.selectedService" style="color: #5777FA">{{props.selectedService.name}}</span>
      <span v-if="props.selectedEnvironment" style="color: #5777FA">{{props.selectedEnvironment.name}}</span>
    </v-card-title>

    <v-card-text>
      <div class="btns">
        <v-btn
            v-for="(item, i) in props.actions"
            :key="i"
            :color="item.color"
            class="ma-2"
            @click="action(item)"
            width="100"
        >
          <v-icon :icon="item.icon" color="white"></v-icon>
          <span class="text-white">{{item.name}}</span>
        </v-btn>
      </div>
    </v-card-text>

    <v-snackbar
        :timeout="2000"
        :color="snackbarColor"
        v-model="snackbar"
    >
      {{snackbarText}}
    </v-snackbar>
  </v-card>
</template>

<script lang="ts" setup>
import {Service} from "@/models/Service";
import {Action} from "@/models/Action";
import {Infrastructure} from "@/models/Infrastructure";
import {ref} from "vue";

interface Props {
  actions: Array<Action>,
  isForService: Boolean,
  selectedService: Service | undefined,
  selectedEnvironment: Infrastructure | undefined
}

const props = defineProps<Props>()

let snackbar = ref(false)
let snackbarText = ref("text")
let snackbarColor = ref("success")

const action = async (item: Action) => {
  console.log(item)
  await item.action(props.isForService ? props.selectedService : props.selectedEnvironment, {
    show: snackbar,
    color: snackbarColor,
    text: snackbarText
  })
}

</script>

<style scoped>
.btns {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
}

div.centered {
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
