<template>
  <footer class="app-footer align-center space-around flex">
    <button>User</button>
    <button>Other1</button>
    <router-link to="/">
      <button>Home</button>
    </router-link>
    <button>Other2</button>
    <button>Other3</button>
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