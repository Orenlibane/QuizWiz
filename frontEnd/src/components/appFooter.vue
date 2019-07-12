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
  display: flex;
  justify-content: space-between;
  width: 100vw;
  align-items: center;
  background: teal;
  padding: 10px;
  border-top: 2px black solid;
}
</style>