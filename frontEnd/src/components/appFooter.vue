<template>
  <footer class="app-footer">
    <router-link exact to="/score" class="footer-btn">
      <i class="fas fa-poll-h"></i>
    </router-link>
    <router-link exact to="/" class="footer-btn">
      <i class="fas fa-home"></i>
    </router-link>
    <router-link exact to="user" class="footer-btn">
      <i class="fas fa-user"></i>
    </router-link>
    <router-link exact to="/library" class="footer-btn">
      <i class="fas fa-gamepad"></i>
    </router-link>
  </footer>
</template>

<script>
import global from "@/styles/global.scss";
export default {};
</script>

<style scoped>
</style>