<template>
  <section class="home-page layout-container">
    <span>{{serverTime}}</span>

    <h1 class="caps">live games</h1>
    <quiz-list v-if="liveGames" :quizes="liveGames"></quiz-list>
    <!-- <h1>Recommended for you</h1>
    <quiz-list v-if="quizes" :quizes="quizes"></quiz-list>-->

    <router-link to="/quiz/add">
      <button class="addQuizBtn">Add quiz</button>
    </router-link>
  </section>
</template>

<script>
import quizList from "../components/quizList";
import global from "@/styles/global.scss";
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
    liveGames() {
      return this.$store.getters.getQuizes;
    },
    quizes() {
      return this.$store.getters.getQuizes;
    },
    serverTime() {
      let time = moment(this.$store.getters.serverTime).format("h:mm:ss");

      return time;
    }
  },
  // data() {
  //   return {
  //     sentFrom: "homePage"
  //   };
  // },
  created() {
    //Checking if a user is logged in. if not - we ask the guest for a nickname and give him an unique ID
    //so he his browser will be recognized by the server.
    (async () => {
      try {
        const user = await this.$store.dispatch({ type: "checkUser" });
        if (!user) {
          console.log("user signed in in app is:", user);
          this.$router.push("/welcome");
        }
      } catch {
        console.log("Something went wrong in app vue");
      }
    })();

    this.$store.dispatch({ type: "loadQuizes" });
    //We send this event in order to make the footer and the header appear when we're not in a game-mode
    eventBus.$emit(GAME_OFF);
    // this.$store.dispatch({ type: "serverClock" });
  }
};
</script>