<template>
  <section class="flex wrap">
    <div v-for="quiz in quizesToShow" :key="quiz._id">
      <quiz-preview :quiz="quiz"></quiz-preview>
    </div>
  </section>
</template>

<script>
import quizPreview from "./quizPreview";
export default {
  props: ["quizes"],
  components: {
    quizPreview
  },
  created() {
    this.$store.dispatch({ type: "loadQuizes" });
  },
  computed: {
    quizesToShow() {
      return this.$store.getters.getQuizes;
    }
  },
  data() {
    return {};
  }
};
</script>
