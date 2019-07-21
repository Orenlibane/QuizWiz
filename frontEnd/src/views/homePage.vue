<template>
  <section class="home-page layout-container">
    <!-- <span>{{serverTime}}</span> -->

    <h1 class="caps">live games</h1>
    <quiz-list v-if="liveGames.length" :quizes="liveGames"></quiz-list>
    <h1 v-else>No Live Games Currently</h1>
    <!-- <h1 class="caps">all games</h1> -->
    <!-- <quiz-list v-if="quizes" :quizes="quizes"></quiz-list> -->
  </section>
</template>

<script>
import quizList from "../components/quizList";
import eventBus, { GAME_OFF } from "@/event-bus.js";
import socketService from "../service/SocketService.js";
const moment = require("moment");

export default {
  name: "home",
  components: {
    quizList
  },
  computed: {
    // *IMPORTANT NOTE: we will attach this computed property to the live games array when we'll start with the multiplayer
    games() {
      return this.$store.getters.getQuizes;
    },
    liveGames() {
      let liveGames = this.$store.getters.getLiveGames;
      return liveGames.filter(
        game => game.isGameOn === false && game.gameType === "mult"
      );
    },
    quizes() {
      return this.$store.getters.getQuizes;
    },
    serverTime() {
      let time = moment(this.$store.getters.serverTime).format("h:mm:ss");

      return time;
    }
  },

  created() {
    console.log("live games", this.liveGames);
    eventBus.$emit(GAME_OFF);
  }
};
</script>