<template>
  <section class="home-page">
    <app-header></app-header>
    <nav>Nav here</nav>
    <div class="quizes-show">
      <h4>here is the ongoing quizes</h4>
      <quiz-list :quizes="liveQuizes"></quiz-list>
    </div>
    <router-link to="/quiz/add">
      <button>Add quiz</button>
    </router-link>
    <div class="quizes-show">
      <h4>here is the recomendd quizes</h4>
      <quiz-list :quizes="liveQuizes"></quiz-list>
    </div>
    <footer>footer here</footer>
  </section>
</template>

<script>
// @ is an alias to /src
import quizList from "../components/quizList";
import homePage from "@/styles/views/_home-page.scss";
import appHeader from "@/components/appHeader";
export default {
  name: "home",
  components: {
    quizList,
    appHeader
  },
  computed: {
    liveQuizes() {
      return this.$store.getters.getQuizes;
    }
  }
};
</script>