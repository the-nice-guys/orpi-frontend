<template>
  <v-card
      elevation="2"
      style="border-radius: 24px"
      height="100%"
      class="pb-2"
  >
    <v-card-title>Actions</v-card-title>

    <div class="btns mt-n8 centered">
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

<!--    <v-snackbar-->
<!--        :timeout="2000"-->
<!--        :color="snackbarColor"-->
<!--        v-model="snackbar"-->
<!--    >-->
<!--      {{snackbarText}}-->
<!--    </v-snackbar>-->
  </v-card>
</template>

<script lang="ts" setup>
import {Service} from "@/models/Service";
import {Action} from "@/models/Action";

interface Props {
  actions: Array<Action>,
  isForService: Boolean,
  selectedService: Service
}

const props = defineProps<Props>()

const action = (item: Action) => {
  console.log(item)
  item.action(props.selectedService)
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
