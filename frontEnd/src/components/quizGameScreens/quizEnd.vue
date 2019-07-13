<template>
  <section class="flex container column both-align-center">
    <h1>{{score | grade}}</h1>
    <h2>Game Ended</h2>
    <div class="flex">
      <div>Correct Answers: {{correctAnsCount}}/</div>
      <div>Wrong Answers: {{wrongAnsCount}}</div>
    </div>

    <div class="questions-sum">
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
  computed: {
    questions() {
      return this.info.quiz.questions;
    },
    score() {
      // return this.info.userScore;

      return this.correctAnsCount / (this.correctAnsCount + this.wrongAnsCount);
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
    }
  }
};
</script>

