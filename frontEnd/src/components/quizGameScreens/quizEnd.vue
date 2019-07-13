<template>
  <section class="flex container column both-align-center">
    <h2>Game Ended</h2>
    <p>Correct Answers: {{correctAnsCount}}</p>
        <p>Wrong Answers: {{wrongAnsCount}}</p>
        <p>Total Score: {{score}}</p>
      <ul v-for="(question, idx) in questions" :key="idx">
        <li>Question #{{idx+1}} : {{question.question}} 
        </li>
      </ul>

  </section>
</template>

<script>
import global from "@/styles/global.scss";
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
      return this.info.quiz.questions
    },
    score() {
      // return this.info.userScore;
      return "נעים לי :)"
    },
    correctAnsCount() {
      let correctAnsCount;
      return this.gameRes.reduce((acc, ans) => {
        if (ans.result === 'true') acc++;
        return acc;
      }, 0);
    },
    wrongAnsCount() {
            let wrongAnsCount;
      return this.gameRes.reduce((acc, ans) => {
        if (ans.result === 'false') acc++;
        return acc;
      }, 0);
    },
    total() {
      return this.gameRes.length;
    }
    
  }
};
</script>

