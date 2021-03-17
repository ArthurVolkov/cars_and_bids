<template>
  <div id="app" class="main-layout">
    <user-msg />
    <app-header />
    <router-view />
  </div>
</template>

 

<script>
import appHeader from './cmps/app-header'
import userMsg from './cmps/user-msg'

export default {
  name: "app-vue",
  created() {
    console.log("Vue App was created!!!");
    this.$store.dispatch({ type: "loadCars" });
  },
  components: {
    appHeader,
    userMsg
  }
};
</script>
