<template>
  <section class="quiz-preview-card">
    <!-- IMG RIGHT SIDE WITH BTNS -->
    <div class="quiz-preview-img-container" :style="{ backgroundImage: 'url(' + imgUrl + ')' }">
      <div class="quiz-preview-btn-container flex">
        <button class="quiz-preview-like-btn">
          <i class="fas fa-thumbs-up"></i>
        </button>
        <span class="quiz-preview-like-count">{{quiz.likesCount}}</span>
      </div>
    </div>
    <!-- PREVIEW DETAILS LEFT SIDE -->
    <div class="quiz-preview-details">
      <p>by {{quiz.creatorName}}</p>
      <h2>{{quiz.name}}</h2>
      <div class="quiz-preview-timer flex space-between align-center">
        <p>{{quiz.tags[0]}} {{quiz.tags[1]}}</p>
        <span>00:59</span>
      </div>
      <div class="flex both-align-center">
        <button class="card-btn" @click="deleteQuiz(quiz._id)">🗑️</button>
        <button class="card-btn">
          <router-link :to="editUrl">Edit</router-link>
        </button>

        <button class="card-btn">
          <router-link v-if="!quiz.gameId" :to="enterGameUrl">Enter</router-link>
          <button v-if="quiz.gameId" @click="enterLiveGame">EnterLiveGame</button>
        </button>
      </div>
    </div>
  </section>
</template>

        

<script>
import quizService from "../service/quizService.js";
import _quizPreview from "../styles/components/_quiz-prev.scss";
import filters from "../filters.js";
import utilService from "../service/utilService.js";
const moment = require("moment");

export default {
  props: {
    quiz: {
      type: Object
    }
  },
  data(){
    return {
      imgUrl:'https://images.unsplash.com/photo-1563454758691-702be3d2e2b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80'
    }
  },
  methods: {
    // THOSE OPTIONS ARE ONLY FOR TESTING!!! The user won't really be able to delete games.
    deleteQuiz(quizId) {
      console.log(quizId, "in the quiz prev");
      this.$store.dispatch({ type: "deleteQuiz", quizId });
    },
    enterLiveGame() {
      let nickName = prompt("please enter your name:");
      let infoToLog = {
        gameId: this.quiz.gameId,
        user: {
          userId: utilService.makeId(),
          nickName: nickName,
          ans: []
        }
      };
      this.$store.dispatch({ type: "setUser", infoToLog: infoToLog.user });
      this.$store.dispatch({ type: "logToLiveGame", infoToLog });
      this.$router.push(`/quiz/${this.quiz._id}/game`);
    }
  },
  computed: {
    editUrl() {
      return `quiz/edit/${this.quiz._id}`;
    },
    enterGameUrl() {
      return `quiz/${this.quiz._id}/game`;
    },
    serverTime() {
      let time = moment(this.$store.getters.serverTime).format("mm:ss");

      return time;
    }
  }
};
</script>