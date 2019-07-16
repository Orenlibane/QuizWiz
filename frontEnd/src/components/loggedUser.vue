<template>
  <div class="loggedUser">
    <span>Welcome, {{userName}} |</span>
    <span>View Profile |</span>
    <button @click="doLogout">Log Out</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedUser: {}
    };
  },
  created() {
    this.loggedUser = this.$store.getters.getUser;
  },
  computed: {
    userName() {
      return this.loggedUser.username;
    }
  },
  methods: {
    doLogout() {
        console.log('loging out');
      this.$store.dispatch({ type: "logout" });
    }
  }
};
</script>