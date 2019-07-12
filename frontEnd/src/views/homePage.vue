<template>
  <section class="home">
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
export default {
  name: "home",
  components: {
    quizList
  },
  computed: {
    liveQuizes() {
      return this.$store.getters.getQuizes;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>