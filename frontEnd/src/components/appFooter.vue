<template>
  <footer class="app-footer center">OPEN SOURCE RULES!</footer>
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
.app-footer {
  width: 100vw;
  background: teal;
  padding: 10px;
  border-top: 2px black solid;
  position: fixed;
  bottom: 0;
}
</style>