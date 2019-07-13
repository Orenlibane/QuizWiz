<template>
  <footer class="app-footer center">
    <button>User</button>
    <button>Other1</button>
    <button>Home</button>
    <button>Other2</button>
    <button>Other3</button>
  </footer>
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
  display: flex;
  justify-content: space-around;
  bottom: 0;
}
</style>