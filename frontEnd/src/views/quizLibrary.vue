<template>
  <div class="quiz-library">
    <h1 class="center">Quiz Library</h1>
    <!-- <quiz-filter></quiz-filter> -->
    <quiz-list v-if="games" :quizes="games"></quiz-list>
  </div>
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