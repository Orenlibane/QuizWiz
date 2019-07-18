  <template>
  <section class="log-in flex align-items justify-conte">
    <h1>Login</h1>
    <form class="flex" @submit.prevent="doLogin">
      <div class="flex column justify-center">
        <span>Username:</span>
        <span>Password:</span>
      </div>
      <div class="flex column justify-center">
        <input type="text" v-model="loginCred.email" placeholder="Enter E-mail" autofocus required />
        <input
          type="password"
          v-model="loginCred.password"
          placeholder="Enter password"
          @keyup.enter="doLogin"
          required
        />
        <button>Login</button>
      </div>
    </form>
  </section>
</template>

<script>
import userService from "../service/userService.js";

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
      console.log("check sanity");
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


