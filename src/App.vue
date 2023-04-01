<template>
  <v-app>
    <div class="app">

      <SideBar class="elevation-4" style="z-index: 3; box-shadow: black" v-if="store.getters.loggedIn"/>
      <router-view style="z-index: 1"/>
    </div>
  </v-app>

</template>

<script lang="ts" setup>
import SideBar from "@/components/SideBar.vue"
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import axios from "axios";
import {onMounted} from "vue";

let store = useStore();
let router = useRouter();

onMounted(async () => {
  await store.dispatch('getTokensFromStorage')

  if (!store.state.refresh_token) {
    await router.push('/login')
  } else {
    axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.refresh_token}`
    await store.dispatch('refresh')

    console.log(store.state.loggedIn)

    if (store.state.loggedIn) {
      await router.push("/overview");
    } else {
      console.log('go to login from app')
      await router.push('/login')
    }
  }
})

</script>

<style lang="scss">
.bg-sheet {
  position: absolute;
  z-index: 0;
}

.v-expansion-panel-title--active {
  background-color: #5777FAFF !important;
  color: #f1f5f9 !important;
}

:root {
  --primary: #5777FA;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1D2336;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --lightbg: #f2f3f8;
  --sidebar-width: 300px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
.app {
  display: flex;
  main {
    flex: 1 1 0;
    padding: 2rem;
    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}
.app {
  background: var(--lightbg);
}
</style>
