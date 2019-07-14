<template>
  <footer class="app-footer">
    <button class="footer-btn" @click.stop="navigateTo('score')">score</button>
    <button class="footer-btn" @click.stop="navigateTo('profile')">profile</button>
    <button class="footer-btn" @click.stop="navigateTo()">home</button>
    <button class="footer-btn" @click.stop="navigateTo('library')">explore</button>
  </footer>
</template>

<script>
import global from "@/styles/global.scss";
export default {
  methods: {
    navigateTo(dest = "") {
      this.$router.push(`/${dest}`);
    }
  }
};
</script>

<style scoped>
</style>