<template>
  <section class="flex container column both-align-center quiz-end">
    <h1 class="score-prec">{{score*100}}%</h1>
    <h3>you had {{correctAnsCount}} correct Answers</h3>
    <h3>{{score | grade}}</h3>
    <h3>Game Ended</h3>
    <h3>Quiz by: Creator of the game</h3>
    <button @click="toggleQuestions">show Questions:</button>
    <div v-if="showQuestions" class="questions-sum">
      <ul class="clean-list" v-for="(question, idx) in questions" :key="idx">
        <li class="flex space-between">
          <span>Question #{{idx+1}} : {{question.question}}</span>
          <span>{{showAnswer(idx) | answerFormat}}</span>
        </li>
      </ul>
    </div>
    <button class="big-btn">Like</button>
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
      return parseFloat(
        this.correctAnsCount / (this.correctAnsCount + this.wrongAnsCount)
      ).toFixed(2);
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

