<template>
  <header class="app-header flex layout-container space-between both-align-center">
<<<<<<< HEAD
    <p class="points">1234 points</p>
    <div class="header-btn-container flex both-align-center">
      <component :is="userState"></component>
=======
    <router-link to="/">
      <h1>QwizWizz</h1>
    </router-link>
    <!-- <p class="points">1234 points</p> -->
    <div class="header-btn-container">
      <logged-user></logged-user>
>>>>>>> be20c4d495c5510b23e4cf5299a66ac14a260713
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
<<<<<<< HEAD
import loginSignup from "./loginSignup";
=======
>>>>>>> be20c4d495c5510b23e4cf5299a66ac14a260713
import loggedUser from "./loggedUser";
export default {
  methods: {},
  components: {
    loggedUser
<<<<<<< HEAD
  },
  computed: {
    userState() {
      var user = this.$store.getters.getUser;
      if (user) return "loggedUser";
      else return "loginSignup";
    }
=======
>>>>>>> be20c4d495c5510b23e4cf5299a66ac14a260713
  }
};
</script>