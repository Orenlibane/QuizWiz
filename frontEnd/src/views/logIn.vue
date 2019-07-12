<template>
  <section class="login flex column align-center">
    <h1>Login</h1>
    <form class="flex column" @submit.prevent="login">
      <div>
        <span>Username:</span>
        <input v-model="user.userName" type="text" placeholder="enter username" required autofocus />
      </div>
      <div>
        <span>Password:</span>
        <input
          type="password"
          v-model="user.password"
          placeholder="enter password"
          required
          @keyup.enter="login"
        />
      </div>
      <button>Login</button>
    </form>
  </section>
</template>

<script>
import userService from "../service/UserService.js";

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


