<template>
  <div id="app">
    <app-header v-if="!game"></app-header>
    <router-view></router-view>
    <app-footer v-if="!game"></app-footer>
  </div>
</template>

<script>
import global from "@/styles/global.scss";
import appHeader from "@/components/appHeader";
import appFooter from "@/components/appFooter";

import eventBus, { GAME_ON, GAME_OFF } from "@/event-bus.js";
import socketService from "./service/SocketService.js";

export default {
  name: "app",
  components: {
    appHeader,
    appFooter
  },
  data() {
    return {
      game: false
    };
  },
  // COMMENTING OUT THE WHOLE USERS PART
  // computed: {
  //   showHeaderAndFooter() {
  //     let isWelcomePage = this.$route.path === "/welcome" ? true : false;
  //     return !isWelcomePage && !this.game;
  //   }
  // },
  async created() {
    eventBus.$on(GAME_ON, game => {
      this.game = true;
    });
    eventBus.$on(GAME_OFF, game => {
      this.game = false;
    });
    this.$store.dispatch({ type: "loadQuizes" });
    //Checking if a user is logged in. if not - he is being redirected to the welcome page, our FOLD,
    // and we give him 3 Options: Login, Signup, or Play as guest.
    //so that his browser will be recognized by the server.
    // COMMENTING OUT THE WHOLE USERS PART
    // try {
    //   const user = await this.$store.dispatch({ type: "checkUser" });
    //   // console.log("checking user in app.vue", user);
    //   // console.log("user is (from app):", this.$store.getters.getUser);
    //   if (!user) {
    //     this.$router.push("/welcome");
    //   }
    // } catch {
    //   console.log("Error in checking if there is a user/guest logged in");
    // }
  }
};
</script>
<style lang="scss">
</style>
