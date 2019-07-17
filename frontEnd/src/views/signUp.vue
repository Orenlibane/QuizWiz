<template>
  <section class="sign-up flex column align-center">
    <h1>Sign Up</h1>

    <form class="flex" @submit.prevent="signUp">
      <div class="flex column">
        <span>Enter Email:</span>
        <span>Enter Password:</span>
        <span>Enter Username:</span>
      </div>

      <div class="flex column">
        <input v-model="signupCred.email" type="email" placeholder="Enter Email" required autofocus />
        <input type="password" v-model="signupCred.password" placeholder="Enter Password" required />
        <input type="text" v-model="signupCred.username" placeholder="Enter Username" required />
      </div>
      <button>Sign Up</button>
    </form>
  </section>
</template>

<script>
import userService from '../service/userService.js';
export default {
  data() {
    return {
      signupCred: {
        email: "",
        password: "",
        username: ""
      }
    };
  },
  methods: {
     signUp() {
      userService.signup(this.signupCred);
      this.$router.push("/");
    }
  }
};
</script>