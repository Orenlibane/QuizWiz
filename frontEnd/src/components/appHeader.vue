<template>
  <header class="app-header">
    <router-link to="/">
    <app-logo></app-logo>
    </router-link>
    
    <nav-bar></nav-bar>
    
  </header>
</template>

<script>
import appLogo from "@/components/appLogo";
import navBar from "@/components/navBar";
export default {
  components: {
    appLogo,
    navBar
  }
};
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  align-items: center;
  background: primaryColor;
}
</style>