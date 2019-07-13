<template>
  <footer class="app-footer align-center space-around flex">
    <span>User</span>
    <router-link to="/libary">
      <span>Quizes</span>
    </router-link>
    <router-link to="/">
      <span>Home</span>
    </router-link>
    <span>Other2</span>
    <span>Other3</span>
  </footer>
</template>

<script>
import appLogo from "@/components/appLogo";
import navBar from "@/components/navBar";
import global from "@/styles/global.scss";
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
  height: 5vh;
  background: teal;
  padding: 5px;
  border-top: 2px black solid;
  position: fixed;

  bottom: 0;
}
button {
  height: 20px;
}
</style>