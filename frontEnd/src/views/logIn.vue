<template>
  <section class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="user.userName" type="text" placeholder="enter username" required autofocus />
      <input
        type="password"
        v-model="user.password"
        placeholder="enter password"
        required
        @keyup.enter="login"
      />
      <br />
      <button>Login</button>
    </form>
  </section>
</template>

<script>
import userService from "../service/userService.js";

export default {
  name: "login",
  data() {
    return {
      user: {
        userName: "",
        password: ""
      }
      //   currUser: userService.getLoggedinUser()
    };
  },
  methods: {
    async login() {
      try {
        const user = await userService.login(this.user);
        this.$router.push("/");
      } catch (err) {
        console.log("CANNOT CONNECT");
      }
      console.log("logging in!");
    }
  },
  components: {}
};
</script>


