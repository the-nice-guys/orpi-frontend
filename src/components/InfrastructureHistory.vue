<template>
  <v-card
      elevation="2"
      style="border-radius: 24px;"
      max-height="400"
      width="100%"
  >
    <v-card-title>History</v-card-title>

    <v-card-text>
      <div class="text-center ma-4" v-if="!store.state.loaded">
        <v-progress-circular color="#5777FA" indeterminate :size="94"></v-progress-circular>
      </div>
      <v-timeline
        v-else
        direction="horizontal"
      >
        <v-timeline-item
            dot-color="#5777FA">
          <template v-slot:opposite>
            23.10.2022 v1.2.0
          </template>
          <div>
            <div class="text-h6">Service added</div>
            <p>
              Service 15 was added on the Host 1
            </p>
          </div>
        </v-timeline-item>

        <v-timeline-item
            dot-color="#1D2336"
        >
          <template v-slot:opposite>
            22.10.2022
          </template>
          <div>
            <div class="text-h6">Snapshot taken</div>
            <p>
              Backup of the environment was taken
            </p>
          </div>
        </v-timeline-item>

        <v-timeline-item
            dot-color="#1D2336"
        >
          <template v-slot:opposite>
            22.10.2022
          </template>
          <div>
            <div class="text-h6">Content title</div>
            <p>
              Lorem ipsum dolor sit amet.
            </p>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>

    <v-card-actions>
      <v-btn color="#5777FAFF">
        See Full History
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {useStore} from "vuex";
export default {
  name: "EnvHistory",
  data: () => ({
    store: useStore()
  }),
}
</script>

<style scoped>

</style>
