<template>
  <section>
    <router-link to="/">
      <button class="btn-quiz">
        <i class="fas fa-backward"></i>
      </button>
    </router-link>
    <div v-if="!showQuestions" class="flex column both-align-center quiz-end">
      <h1 class="score-prec">{{correctAnsPercentage}}%</h1>
      <h3>you had {{correctAnsCount}} correct Answers</h3>
      <h3>{{correctAnsPercentage | grade}}</h3>
      <h3>Your Score: {{score}}</h3>
      <h3>Game Ended</h3>
      <h3>Quiz by: Creator of the game</h3>
      <button class="big-btn">Like</button>
      <button @click="toggleQuestions" class="show-questions-btn">show Questions:</button>
    </div>

    <div v-if="showQuestions" class="questions-sum flex column">
      <button @click="toggleQuestions" class="show-questions-btn">show Questions:</button>
      <ul class="clean-list" v-for="(question, idx) in questions" :key="idx">
        <li class="flex space-between">
          <span>Question #{{idx+1}} : {{question.question}}</span>
          <span>{{showAnswer(idx) | answerFormat}}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import global from "@/styles/global.scss";
import filters from "@/filters.js";
export default {
  props: {
    gameRes: {
      type: Array
    },
    info: {
      type: Object
    }
  },
  data() {
    return {
      showQuestions: false
    };
  },
  computed: {
    questions() {
      return this.info.quiz.questions;
    },

    score() {
      return this.gameRes.reduce((acc, ans) => {
        acc += ans.score;
        return acc;
      }, 0);
    },
    correctAnsPercentage() {
      return Math.round((this.correctAnsCount / this.questions.length) * 100);
    },
    correctAnsCount() {
      let correctAnsCount;
      return this.gameRes.reduce((acc, ans) => {
        if (ans.result === "true") acc++;
        return acc;
      }, 0);
    },
    wrongAnsCount() {
      let wrongAnsCount;
      return this.gameRes.reduce((acc, ans) => {
        if (ans.result === "false") acc++;
        return acc;
      }, 0);
    },
    total() {
      return this.gameRes.length;
    }
  },
  methods: {
    showAnswer(idx) {
      return this.gameRes[idx].result;
    },
    toggleQuestions() {
      this.showQuestions = !this.showQuestions;
    }
  }
};
</script>

