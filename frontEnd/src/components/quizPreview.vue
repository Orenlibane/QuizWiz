<template>
  <div class="card">
    <div class="flex space-around">
      <p>{{quiz.title}}</p>
      <p>{{quiz.likesCount}}</p>
    </div>
    <div class="flex space-around">
      <!-- <p>{{quiz.tags}}</p> -->
      <p>{{quiz.createdAt}}</p>
    </div>
    <div class="flex justify-center">
      <button @click="deleteQuiz(quiz._id)">Delete</button>
      <button>Enter</button>
    </div>
  </div>
</template>

<script>
import quizService from "../service/quizService.js";
export default {
  props: ["quiz"],
  methods: {
    deleteQuiz(quizId) {
      this.$store.dispatch({ type: "deleteQuiz", quizId }).then(() => {
        quizService.deleteQuiz(quizId);
      });
    }
  }
};
</script>
<style>
</style>
