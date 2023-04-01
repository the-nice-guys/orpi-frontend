<template>
  <div class="container">
    <div class="py-4">

      <div class="mx-auto mb-10 elevation-8" style="background-color: transparent; border-radius: 24px;">
        <v-img
            class="pa-8 mx-auto"
            max-width="228"
            :src="logoURL"
        ></v-img>
      </div>

      <v-card
          class="mx-auto pa-12 pb-8 outline"
          elevation="8"
          max-width="448"
          style="border-radius: 24px"
      >

        <div class="text-subtitle-1 text-medium-emphasis">Account</div>

        <v-text-field
            v-model="email"
            density="comfortable"
            placeholder="Email address"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password

          <a
              class="text-caption text-decoration-none text-blue"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
          >
            Forgot login password?</a>
        </div>

        <v-text-field
            v-model="password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="comfortable"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-card
            class="mb-12"
            color="surface-variant"
            variant="tonal"
        >
          <v-card-text class="text-medium-emphasis text-caption">
            Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
          </v-card-text>
        </v-card>

        <v-btn
            block
            class="mb-8"
            color="#5777FAFF"
            size="large"
            @click="login"
            v-if="!store.getters.loggedIn"
        >
          <span style="color: white">Log In</span>
        </v-btn>

        <v-btn
            block
            class="mb-8"
            color="#5777FAFF"
            size="large"
            variant="tonal"
            @click="logout"
            v-else
        >
          Log Out
        </v-btn>

        <v-card-text class="text-center">
          <a
              class="text-blue text-decoration-none"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
          >
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import logoFullURL from '../assets/logo_full.png'
import {ref} from "vue";

let store = useStore();
let router = useRouter();

let logoURL = logoFullURL;
let visible = ref(false);
let email = ref<string>("")
let password = ref('')

let login = async () => {
  let res = await store.dispatch('login', {email: email.value, password: password.value});

  if (res) {
    await router.push('/overview');
  }
}

let logout = async () => {
  await store.dispatch('setLoggedIn', false);
}

</script>

<style scoped>

.container {
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: rgb(29,35,54);
  background: linear-gradient(180deg, rgba(29,35,54,1) 25%, rgba(87,119,250,1) 100%);
}
</style>
