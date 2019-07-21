<template>
  <section class="home-page layout-container">
<<<<<<< HEAD
    <h1 class="white-headline">live games</h1>
    <quiz-list class="live-games" v-if="liveGames.length" :quizes="liveGames"></quiz-list>
    <h1 class="orange-headline" v-else>no active games currently. . .</h1>
    <hr>
    <h1 class="white-headline">all games</h1>
    <quiz-list v-if="quizes" :quizes="quizes"></quiz-list>
    <div class="flex both-align-center">
      <!-- <router-link to="/quiz/add">
        <button class="addQuizBtn">Add Quiz</button>
      </router-link> -->
    </div>
=======
    <!-- <span>{{serverTime}}</span> -->

    <h1 class="caps">live games</h1>
    <quiz-list v-if="liveGames.length" :quizes="liveGames"></quiz-list>
    <h1 v-else>No Live Games Currently</h1>
    <!-- <h1 class="caps">all games</h1> -->
    <!-- <quiz-list v-if="quizes" :quizes="quizes"></quiz-list> -->
>>>>>>> 43f5f8c110a8409b9a5872ca220c656e0b44195f
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
  }
};
</script>