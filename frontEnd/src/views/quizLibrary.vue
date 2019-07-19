<template>
  <div class="quiz-library layout-container">
    <h1>Quiz Library</h1>
    <!-- <quiz-filter></quiz-filter> -->
    <quiz-list v-if="quizes" :quizes="quizes"></quiz-list>
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
    quizes() {
      return this.$store.getters.getQuizes;
    }
  }
  // created() {
  //   this.$store.dispatch({type: "loadQuizes"})
  // }
};
</script>
<style lang="scss" scoped>
h1 {
  color: white;
  margin-bottom: em(10px);
  font-family: "Lilita-One-regular", sans-serif;
}
</style>
