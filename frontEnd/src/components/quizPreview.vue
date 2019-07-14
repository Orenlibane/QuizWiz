<template>
  <div class="card flex space-around">
    <div class="img-container-card">
      <img src="https://api.adorable.io/avatars/80/1" alt />
      <div class="likes-count">
        <i class="fas fa-thumbs-up"></i>
        :{{quiz.likesCount}}
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
    <div>
      <div class="flex column center space-between card-info">
        <div class="tags-prev flex space-between">
          <p>{{quiz.tags[0]}}</p>
          <p>{{quiz.tags[1]}}</p>
        </div>
        <h3>{{quiz.title}}</h3>
        <p>creator Name: {{quiz.creatorName}}</p>
        <!-- We need to render the timer only if its a live-game room
            Idea: when we will have live-game objects, they will have a countdown till game begins.
            we'll check if th current quiz object has the countdownToGame attribute, and if it does,
            we'll render the countdown.
        -->
        <h3 class="right">30:00</h3>
      </div>
    </div>
  </div>
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