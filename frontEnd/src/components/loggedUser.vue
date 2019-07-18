<template>
  <div v-if="currUser" class="loggedUser">
    <span>Welcome, {{currUser.username}} |</span>
    <router-link :to="profileUrl">
      <!-- <span>My Profile |</span> -->
    </router-link>
    <button @click="doLogout">Log Out</button>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     loggedUser: Object
  //   };
  // },
  // created() {
  //   this.loggedUser = this.$store.getters.getUser;
  //   console.log("logged user obj:", this.$store.getters.getUser);
  // },
  computed: {
    currUser() {
      return this.$store.getters.getUser;
    },
    profileUrl() {
      return "profile/" + this.currUser._id;
    }
  },
  methods: {
    doLogout() {
      console.log("loging out");
      this.$store.dispatch({ type: "logout" });
      this.$router.push("/welcome");
    }
  }
};
</script>