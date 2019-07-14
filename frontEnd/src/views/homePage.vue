<template>
  <section class="home-page">
    <div class="quizes-show">
      <h1 class="center caps">Ongoing Quizes</h1>
      <quiz-list :quizes="liveQuizes"></quiz-list>
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
    liveQuizes() {
      return this.$store.getters.getQuizes;
    }
  },
  data() {
    return {
      sentFrom: "homePage"
    };
  },
  created() {
    var game = false;
    eventBus.$emit(GAME_OFF, game);
  }
};
</script>