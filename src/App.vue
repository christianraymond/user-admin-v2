<template>
  <div id="app">
    <app-header />
    <router-view></router-view>
    <Dashboard/>
  </div>
</template>

<script>
import Header from "./components/header/header.vue";
import Dashboard from './components/dashboard/dashboard.vue'
export default {
  name: "app",
  components: {
    "app-header": Header,
    Dashboard
  },
  created() {
    this.$store.dispatch("AutoLogin");
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Baloo+Thambi+2&display=swap");
body,
html {
  margin: 0;
  font-family: "Baloo Thambi 2", cursive;
  background-color: #fff;
}
</style>
