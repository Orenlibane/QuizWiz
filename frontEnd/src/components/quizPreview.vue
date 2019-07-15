<template>
  <section class="quiz-preview-card flex">
    <!-- IMG RIGHT SIDE WITH BTNS -->
    <div class="quiz-preview-img-container">
      <img class="quiz-img-preview" src="@/assets/placeholder_600x400_2.jpg" alt />
      <div class="quiz-preview-btn-container flex">
        <button class="quiz-preview-like-btn">
          <i class="fas fa-thumbs-up"></i>
        </button>
        <span class="quiz-preview-like-count">{{quiz.likesCount}}</span>
      </div>
    </div>
    <!-- PREVIEW DETAILS LEFT SIDE -->
    <div class="quiz-preview-details">
      <p>{{quiz.tags[0]}} {{quiz.tags[1]}}</p>
      <h2>{{quiz.name}}</h2>
      <p>by {{quiz.creatorName}}</p>
      <div class="quiz-preview-timer">
        <span>00:59</span>
      </div>
      <div class="flex both-align-center">
        <button @click="deleteQuiz(quiz._id)">🗑️</button>
        <button>
          <router-link :to="editUrl">Edit</router-link>
        </button>

        <button>
          <router-link :to="enterGameUrl">Enter</router-link>
        </button>
      </div>
    </div>
  </section>
</template>

        

<script>
import quizService from "../service/quizService.js";
import _quizPreview from "../styles/components/_quiz-prev.scss";

export default {
  props: {
    quiz: {
      type: Object
    }
  },
  methods: {
    // THOSE OPTIONS ARE ONLY FOR TESTING!!! The user won't really be able to delete games.
    deleteQuiz(quizId) {
      console.log(quizId, "in the quiz prev");
      this.$store.dispatch({ type: "deleteQuiz", quizId });
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