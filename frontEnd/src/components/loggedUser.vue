<template>
  <div v-if="currUser" class="loggedUser">
    <span class="avatar"></span>
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
      this.$store.dispatch({ type: "logout" });
      this.$router.push("/welcome");
    }
  }
};
</script>

<style scoped lang="scss">
.avatar {
  background: white;
  border: 2px solid black;
  padding: 2rem;
  padding-right: 3rem;
  border-radius: 3rem;
}
</style>