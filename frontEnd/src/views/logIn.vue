<template>
  <section class="login flex column align-center">
    <h1>Login</h1>
    <form class="flex column" @submit.prevent="doLogin">
      <div>
        <span>Username:</span>
        <input v-model="loginCred.email" type="text" placeholder="Enter E-mail" autofocus required />
      </div>
      <div>
        <span>Password:</span>
        <input
          type="password"
          v-model="loginCred.password"
          placeholder="Enter password"
          @keyup.enter="login"
          required
        />
      </div>
      <button>Login</button>
    </form>
  </section>
</template>

<script>
import userService from "../service/userService";

export default {
  name: "login",
  data() {
    return {
      loginCred: {
        email: "",
        password: ""
      }
      //   currUser: userService.getLoggedinUser()
    };
  },
  methods: {
    async doLogin() {
      // console.log('check sanity');
      const cred = this.loginCred;
      await this.$store.dispatch({ type: "login", userCred: cred });
      const user = this.$store.getters.getUser;
      // console.log("user:", user);
      if (user) this.$router.push("/");
    }
  },
  created() {
    if (this.$store.getters.getUser) {
      console.log("papapapapapa", this.$store.getters.getUser);
    }
  }
};
</script>


