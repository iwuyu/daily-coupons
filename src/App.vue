<template>
  <div id="app">
    <router-view />
    <main-tab-bar v-show="$route.path.indexOf('/admin'||'/detail')"/>
  </div>
</template>

<script>
import MainTabBar from "./components/content/MainTabBar/MainTabBar";
export default {
  name:"App",
  data() {
    return {
    }
  },
  components: {
    MainTabBar
  }
}
</script>

<style lang="scss" scoped>
  @import "./assets/css/base.css"
</style>
