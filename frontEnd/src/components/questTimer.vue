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
      questIdx: this.info.currQuest
      // currTimeStamp: null,
      // destTimeStamp: null
    };
  },
  created() {
    // this.destTimeStamp = this.currTimeStamp + 10000
    // console.log('dest - curr =', this.destTimeStamp - this.currTimeStamp);
    this.timer = 10;

    this.countDown = setInterval(() => {
      // console.log("time ticking", this.timer);
      this.$emit("emitTime", this.timer);
      this.timer--;
    }, 1000);
  },
  updated() {
    //Timer Case #1: Time is up and the user did not pick an answer
    if (this.timer === 0) {
      //If its the last question: goodbye :)
      if (this.info.currQuest + 1 === this.info.quiz.quests.length) {
        this.$emit("gameStage", { cmp: "quizEnd", ans: "false" });
      }
      //else, we keep on with the current game session
      else {
        this.$emit("gameStage", { cmp: "quizQuest", ans: "false" });
        this.timer = 10;
      }
      //Timer Case #2: The user picked an answer
    }
    if (this.questIdx !== this.info.currQuest) {
      //If game ended
      if (this.info.currQuest === this.info.quiz.quests.length) {
        console.log("Interval cleared");
        clearInterval(this.countDown);
      }
      this.questIdx++;
      this.timer = 10;
    }
  }
};
</script>