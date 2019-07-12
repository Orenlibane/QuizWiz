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
    <div class="flex both-align-center">
      <button @click="deleteQuiz(quiz._id)">🗑️</button>
      <router-link :to="editUrl">
        <button>Edit</button>
      </router-link>
      <button>Enter</button>
    </div>
  </div>
</template>

<script>
import quizService from "../service/quizService.js";
import _quizPreview from "../styles/components/_quiz-prev.scss";

export default {
  props: ["quiz"],
  methods: {
    deleteQuiz(quizId) {
      this.$store.dispatch({ type: "deleteQuiz", quizId }).then(() => {
        quizService.deleteQuiz(quizId);
      });
    }
  },
  computed: {
    editUrl() {
      return `quiz/edit/${this.quiz._id}`;
    }
  }
};
</script>
<style>
</style>
