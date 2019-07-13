<template>
  <div class="card flex space-around">
    <div class="img-container-card">
      <img src="https://api.adorable.io/avatars/80/1" alt />
      <div class="likes-count">Likes:{{quiz.likesCount}}</div>
      <div class="flex both-align-center">
        <button @click="deleteQuiz(quiz._id)">🗑️</button>
        <router-link :to="editUrl">
          <button>Edit</button>
        </router-link>
        <router-link :to="enterGameUrl">
          <button>Enter</button>
        </router-link>
      </div>
    </div>
    <div>
      <div class="flex column center space-between card-info">
        <!-- <p>{{quiz.tags}}</p> -->
        <div class="tags-prev flex space-between">
          <p>{{quiz.tags[0]}}</p>
          <p>{{quiz.tags[1]}}</p>
        </div>
        <h3>{{quiz.title}}</h3>
        <p>creator Name:</p>
        <h3 class="right">30:00</h3>
      </div>
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
    },
    enterGameUrl() {
      return `quiz/${this.quiz._id}/game`;
    }
  }
};
</script>
<style>
</style>
