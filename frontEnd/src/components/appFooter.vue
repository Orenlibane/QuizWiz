<template>
  <footer class="app-footer">
    <router-link exact to="/score" class="footer-btn">
      <button class="score-btn"></button>
    </router-link>
    <router-link exact to="/" class="footer-btn">
      <button class="home-btn"></button>
    </router-link>
    <router-link exact to="user" class="footer-btn">
      <button class="home-btn"></button>
    </router-link>
    <router-link exact to="/library" class="footer-btn">
      <button class="home-btn"></button>
    </router-link>
  </footer>
</template>

<script>
import global from "@/styles/global.scss";
export default {};
</script>

<style scoped>
</style>