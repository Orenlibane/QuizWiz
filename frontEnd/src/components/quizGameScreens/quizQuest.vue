<template>
  <!-- <section class="quizQuest flex both-align-center column">
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
  </section>-->
  <section class="quiz-quest layout-container">
    <div class="question-status flex space-between">
      <span>Question {{currQuestNum}}/7</span>
      <span>{{timer}}</span>
    </div>
    <div class="quest-name-container">
      <h2 class="center">{{currQuest}}</h2>
    </div>
    <div class="quest-answers-container">
      <button
        class="quest-anser-btn"
        :class="ansStyle(idx)"
        @click="chooseAns(idx)"
        v-for="(opt,idx) in currOpts"
        :key="idx"
      >{{opt}}</button>
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
      timerInterval: null,
      quest: {
        name: "what type of food represents summer?",
        opts: ["watermelon", "orange", "apple", "tomato"]
      }
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
            answerInfo: {
              currAns: true,
              score: this.timer * 10
            }
            // id: this.$store.getters.getUser
          }
        });
      } else {
        this.$store.dispatch({
          type: "updateAns",
          res: {
            answerInfo: {
              currAns: false,
              score: this.timer * 10
            }
            // id: this.$store.getters.getUser
          }
        });
      }
    },
    ansStyle(idx) {
      if (!this.isAnswered) return "";
      if (idx === this.correctOptIdx) return "correctAnsStyle";
      return "wrongAnsStyle";
    }
  },

  destroyed() {
    clearInterval(this.timerInterval);
    // let player = this.$store.state.getters.getUser;
    if (!this.isAnswered) {
      console.log("here");
      this.$store.dispatch({
        type: "updateAns",
        res: {
          answerInfo: {
            currAns: false,
            score: this.timer * 10
          }
          // id: this.$store.getters.getUser
        }
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
