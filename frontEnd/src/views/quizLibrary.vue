<template>
  <section class="layout-container">
    <h1>Quiz Library</h1>
    <div class="quiz-library">
      <quiz-list v-if="games" :quizes="games"></quiz-list>
    </div>
  </section>
</template>

<script>
import global from "@/styles/global.scss";
import quizList from "../components/quizList";
import quizFilter from "@/components/quizFilter";

export default {
  props: [],
  components: { quizList, quizFilter },
  computed: {
    games() {
      return this.$store.getters.getQuizes;
    }
  },
  created() {}
};
</script>