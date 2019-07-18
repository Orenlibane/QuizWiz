<template>
  <div class="quiz-libary">
    <h1>This is quiz libary page</h1>
    <quiz-filter></quiz-filter>
    <quiz-list :quizes="liveQuizes"></quiz-list>
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
    liveQuizes() {
      return this.$store.getters.getQuizes;
    }
  },
  created() {
    console.log("libary");
  }
};
</script>