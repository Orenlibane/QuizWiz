<template>
  <section class="sign-up flex column align-center">
    <h1>Sign Up</h1>

    <form class="flex" @submit.prevent="signUp">
      <div class="flex column">
        <span>Enter new username:</span>
        <span>Enter Password:</span>
        <span>Enter New Password:</span>
      </div>

      <div class="flex column">
        <input
          v-model="newUser.userName"
          type="text"
          placeholder="Enter Username"
          required
          autofocus
        />
        <input type="password" v-model="newUser.pass" placeholder="Enter Password" required />
        <input
          type="password"
          v-model="newUser.rePass"
          placeholder="Confirm Password"
          required
          @keyup.enter="signUp"
        />
      </div>
      <button>Sign Up</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      newUser: {
        userName: "",
        pass: "",
        rePass: ""
      }
    };
  },
  methods: {
    signUp() {
      if (this.newUser.pass !== this.newUser.rePass) return;
      console.log("signing up", this.newUser);
      this.$router.push("/");
    }
  }
};
</script>