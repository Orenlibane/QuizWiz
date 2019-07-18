<template>
  <section class="welcome-page flex column align-center justify-center">
    <h1 class="fs40">Welcome To QwizWiz</h1>
    <h2 class="center">A trivia game with people from all across the world.</h2>
    <component class="form-container" :is="formToShow"></component>
    <div class="flex">
    <button @click="chooseCmp('logIn')">Log In</button>
    <button @click="chooseCmp('signUp')">Sign Up</button>
    <button @click="chooseCmp('regGuest')">Play As Guest</button>
 </div>
  </section>
</template>
<script>
import logIn from "../components/logIn";
import signUp from "./signUp";
import regGuest from "../components/regGuest";
export default {
  data() {
    return {
      formToShow: String
    };
  },
  created() {
    this.formToShow = "logIn";
  },
  methods: {
    chooseCmp(formName) {
      console.log("changing form to", formName);
      this.formToShow = formName;
    }
  },
  components: {
    logIn,
    signUp,
    regGuest
  }
};
</script>