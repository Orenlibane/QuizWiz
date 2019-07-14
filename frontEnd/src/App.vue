<template>
  <div id="app">
    {{checkForFooter}}
    <app-header v-if="!game"></app-header>
    <router-view></router-view>
    <app-footer v-if="!game"></app-footer>
  </div>
</template>

<script>
import appHeader from "@/components/appHeader";
import appFooter from "@/components/appFooter";
import eventBus, { GAME_ON, GAME_OFF } from "@/event-bus.js";

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
  computed: {
    checkForFooter() {
      return window.location.pathname;
    }
  },
  created() {
    eventBus.$on(GAME_ON, game => {
      this.game = game;
    });
    eventBus.$on(GAME_OFF, game => {
      this.game = game;
    });
  }
};
</script>
<style lang="scss">
</style>
