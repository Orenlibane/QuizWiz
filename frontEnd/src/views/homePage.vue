<template>
  <section class="home-page layout-container">
    <div class="quizes-show">
      <h1 class="center caps">Ongoing Quizes</h1>
      <quiz-list v-if="liveGames" :quizes="liveGames"></quiz-list>
      <h1>Recommended for you</h1>
      <quiz-list v-if="quizes" :quizes="quizes"></quiz-list>
    </div>
    <router-link to="/quiz/add">
      <button class="addQuizBtn">Add quiz</button>
    </router-link>
  </section>
</template>

<script>
import quizList from "../components/quizList";
import global from "@/styles/global.scss";
import eventBus, { GAME_OFF } from "@/event-bus.js";

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
  },
  // data() {
  //   return {
  //     sentFrom: "homePage"
  //   };
  // },
  created() {
    this.$store.dispatch({ type: "loadQuizes" });
    //We send this event in order to make the footer and the header appear when we're not in a game-mode
    eventBus.$emit(GAME_OFF);
  }
};
</script>