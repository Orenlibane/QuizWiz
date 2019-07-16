<template>
  <div id="app">
    <app-header v-if="!game"></app-header>
    <router-view></router-view>
    <app-footer v-if="!game"></app-footer>
  </div>
</template>

<script>
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
  computed: {},
  created() {
    eventBus.$on(GAME_ON, game => {
      this.game = true;
    });
    eventBus.$on(GAME_OFF, game => {
      this.game = false;
    });
    this.$store.dispatch({type: "checkUser"})
  }
};
</script>
<style lang="scss">
</style>
