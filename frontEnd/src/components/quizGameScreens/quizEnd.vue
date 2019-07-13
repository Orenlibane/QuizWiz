<template>
  <section class="flex container column both-align-center">
    <p class="message">game ended</p>
    <p>succseded {{correct}}/{{total}}</p>
    <li class="clean-list" v-for="(answer,idx) in info.answers" :key="idx">
      <ul>{{answer.questIdx}}-{{answer.result}}</ul>
    </li>
    <p>score={{score}}</p>
    <button>like</button>
    <button>X</button>
  </section>
</template>

<script>
import global from "@/styles/global.scss";
export default {
  data() {
    return {
      info: {
        answers: [
          { questIdx: 1, result: false },
          { questIdx: 2, result: true },
          { questIdx: 3, result: false },
          { questIdx: 4, result: true },
          { questIdx: 5, result: false },
          { questIdx: 6, result: true }
        ],
        userScore: 200
      }
    };
  },
  computed: {
    score() {
      return this.info.userScore;
    },
    correct() {
      let correctAnsCount;
      return this.info.answers.reduce((accumulator, answer) => {
        if (answer.result) accumulator++;
        return accumulator;
      }, 0);
    },
    total() {
      return this.info.answers.length;
    }
  }
};
</script>
