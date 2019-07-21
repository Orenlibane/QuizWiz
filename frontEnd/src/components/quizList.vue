<template>
  <section class="quiz-list-container">
    <quiz-preview v-for="quiz in quizes" :key="quiz._id" :quiz="quiz"></quiz-preview>
  </section>
</template>

<script>
import quizPreview from "./quizPreview";
export default {
  props: {
    quizes: {
      type: Array
    }
  },
  components: {
    quizPreview
  },
  computed: {}
};
</script>
