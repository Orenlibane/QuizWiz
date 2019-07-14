<template>
  <div class="quest-time">
    <h3 class="center">{{timer}} sec</h3>

    <!-- info:{{info.currentQuestion}}
    game res: {{gameRes}}-->
  </div>
</template>

<script>
import global from "@/styles/global.scss";
export default {
  props: {
    info: {
      type: Object
    },
    gameRes: {
      type: Array
    }
  },
  data() {
    return {
      timer: null,
      countDown: null,
      questIdx: this.info.currentQuestion
    };
  },
  created() {
    this.timer = 10;
    this.countDown = setInterval(() => {
      this.$emit("emitTime", this.timer);
      this.timer--;
    }, 1000);
  },
  updated() {
    //Timer Case #1: Time is up and the user did not pick an answer
    if (this.timer === 0) {
      //If its the last question: goodbye :)
      if (this.info.currentQuestion + 1 === this.info.quiz.questions.length) {
        this.$emit("gameStage", { cmp: "quizEnd", answer: "false" });
      }
      //else, we keep on with the current game session
      else {
        this.$emit("gameStage", { cmp: "quizQuest", answer: "false" });
        this.timer = 10;
      }
      //Timer Case #2: The user picked an answer
    }
    if (this.questIdx !== this.info.currentQuestion) {
      this.questIdx++;
      this.timer = 10;
    }
  }
};
</script>