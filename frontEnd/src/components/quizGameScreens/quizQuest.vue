<template>
  <section class="quizQuest flex both-align-center column">
    <h1 class="question-render">{{currQuest}}</h1>
    <div class="answers">
      <div
        class="possible-answers"
        v-for="(opt,idx) in currOpts"
        :key="idx"
        @click="chooseAns(idx)"
      >
        <button :class="ansStyle(idx)">{{opt}}</button>
      </div>
      {{timer}}
    </div>
  </section>
</template>


<script>
import global from "@/styles/global.scss";
export default {
  name: "quizQuest",
  props: {
    info: {
      type: Object
    }
  },
  data() {
    return {
      isAnswered: false,
      timer: 10,
      timerInterval: null
    };
  },
  computed: {
    currQuestNum() {
      return this.info.currQuest;
    },
    currQuest() {
      return this.info.quiz.quests[this.info.currQuest].txt;
    },
    currOpts() {
      return this.info.quiz.quests[this.info.currQuest].opts;
    },
    correctOptIdx() {
      return this.info.quiz.quests[this.info.currQuest].correctOptIdx;
    }
  },
  methods: {
    chooseAns(idx) {
      if (this.isAnswered) return;
      this.isAnswered = true;
      let currAns = idx === this.correctOptIdx;
      if (currAns) {
        this.$store.dispatch({
          type: "updateAns",
          res: {
            currAns: true,
            score: this.timer * 10
          }
        });
      } else {
        this.$store.dispatch({
          type: "updateAns",
          res: { currAns: false, score: 0 }
        });
      }
    },
    ansStyle(idx) {
      if (!this.isAnswered) return "";
      if (idx === this.correctOptIdx) return "correctAnsStyle";
      return "wrongAnsStyle";
    }
  },
  mounted() {
    console.log("the info:", this.info);
  },
  destroyed() {
    clearInterval(this.timerInterval);
    let playerId = this.$store.state.user.id;
    if (!this.isAnswered) {
      console.log("here");
      this.$store.dispatch({
        type: "updateAns",
        res: { currAns: false, score: 0 }
      });
    }
  },
  created() {
    this.timerInterval = setInterval(() => {
      this.timer--;
    }, 1000);
  }
};
</script>

<style scoped>
.wrongAnsStyle {
  background: red;
}

.correctAnsStyle {
  background: green;
}
</style>
