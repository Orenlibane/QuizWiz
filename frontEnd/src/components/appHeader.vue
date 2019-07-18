<template>
  <header class="app-header flex layout-container space-between both-align-center">
    <p class="points">1234 points</p>
    <div class="header-btn-container flex both-align-center">
      <component :is="userState"></component>
      <button class="header-btn">
        <i class="fas fa-search"></i>
      </button>
      <button class="header-btn">
        <i class="fas fa-filter"></i>
      </button>
    </div>
  </header>
</template>

<script>
import loginSignup from "./loginSignup";
import loggedUser from "./loggedUser";
export default {
  methods: {},
  components: {
    loginSignup,
    loggedUser
  },
  computed: {
    userState() {
      var user = this.$store.getters.getUser;
      if (user) return "loggedUser";
      else return "loginSignup";
    }
  }
};
</script>

<style scoped>
</style>