<template>
  <section>
    <div v-for="quiz in quizes" :key="quiz._id">
      <quiz-preview :quiz="quiz"></quiz-preview>
    </div>
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
  computed: {},

};
</script>
