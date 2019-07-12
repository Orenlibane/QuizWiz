<template>
  <section class="flex">
    <div v-for="quiz in quizesToShow" :key="quiz._id">
      <quiz-preview :quiz="quiz"></quiz-preview>
    </div>
  </section>
</template>

<script>
import quizPreview from "./quizPreview";
export default {
  props: [],
  components: {
    quizPreview
  },
  created() {
    this.$store.dispatch({ type: "loadQuizes" });
  },
  computed: {
    quizesToShow() {
      console.log(this.$store.getters.getQuizes);
      return this.$store.getters.getQuizes;
    }
  },
  data() {
    return {
      quizes: ""
    };
  }
};
</script>
