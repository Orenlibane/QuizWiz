<template>
  <header class="app-header">
    <app-logo></app-logo>
    <log-in></log-in>
  </header>
</template>

<script>
import appLogo from "@/components/appLogo";
import logIn from "@/components/logIn";
export default {
  components: {
    appLogo,
    logIn
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