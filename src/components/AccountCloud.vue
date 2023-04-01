<template>
  <div class="container" @click="expanded = !expanded" v-bind:class="{expanded: expanded}">
    <v-avatar
        class="mr-4 mt-4"
        color="#5777FA"
        size="64"
    >
      <span class="white--text text-h5">AG</span>
    </v-avatar>
    <div class="ma-4 info">
      <span class="name">{{store.getters.user.name}}</span>
      <span class="balance"> Balance: 461$</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useStore} from "vuex";
import {reactive, ref} from "vue";

let store = useStore();

let expanded = ref(false);

</script>

<style lang="scss" scoped>
.container {
  z-index: 1;
  display: flex;
  flex-direction: row-reverse;
  background-color: #1D2336;
  height: 6rem;
  /*max-width: 24rem;*/
  width: 10%;
  min-width: 20rem;
  border-radius: 8rem;
  transition: width 0.2s ease-in-out;
  &.expanded {
    transition: width 0.2s ease-in-out;
    width: 70%;
  }
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
span {
  color: var(--light);
}
.name {
  font-size: 1.5rem;
}
.balance {
  font-size: 1.3rem;
}
</style>
