<template>
  <header class="app-header flex layout-container space-between both-align-center">
    <router-link to="/">
      <h1>QwizWizz</h1>
    </router-link>
    <logged-user></logged-user>

    <!-- <p class="points">1234 points</p> -->
    <div class="header-btn-container flex both-align-center">
      <logged-user></logged-user>
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
import loggedUser from "./loggedUser";
export default {
  methods: {},
  components: {
    loggedUser
  }
};
</script>