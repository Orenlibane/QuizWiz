<template>
  <section class="home-page layout-container">
    <h1 class="white-headline">Live games</h1>
    <quiz-list class="live-games" v-if="liveGames.length" :quizes="liveGames"></quiz-list>
    <h1 class="orange-headline" v-else>No active games currently. . .</h1>
    <!-- <hr class="margin-fix-top"/> -->
    <h1 class="white-headline margin-fix margin-fix-bottom margin-fix-top">All games</h1>
    <quiz-list class="add-margin-bottom" v-if="quizes" :quizes="quizes"></quiz-list>
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
    this.$store.dispatch({type:'setGameStatus', status:false});
  }
};
</script>