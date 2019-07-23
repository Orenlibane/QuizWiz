<template>
  <!-- <section class="quiz-quest layout-container">
    <div class="question-status flex space-between">
      <div v-if="info.quiz.quests.length ===currQuestNum+1">Bonus Round!</div>
      <span>Question {{currQuestNum+1}}/{{info.quiz.quests.length}}</span>
      <span>{{timer}}</span>
    </div>
    <div class="quest-name-container flex justify-center align-center column">
      <h2 class="center">{{currQuest}}</h2>
    </div>
    <div class="quest-answers-container justify-center align-center">
      <button
        class="quest-answer-btn"
        :class="ansStyle(idx)"
        @click="chooseAns(idx)"
        v-for="(opt,idx) in currOpts"
        :key="idx"
      >{{opt}}</button>
    </div>
  </section>-->
  <section>
    <div class="quest-header flex justify-center align-center column">
      <span>Question {{currQuestNum+1}}/{{info.quiz.quests.length}}</span>
      <h2>{{timer}}</h2>
      <h2 class="center">{{currQuest}}</h2>
    </div>
    <div class="quest-body">
      <button
        class="quest-opt-btn"
        :class="ansStyle(idx)"
        @click="chooseAns(idx)"
        v-for="(opt,idx) in currOpts"
        :key="idx"
      >
        {{opt}}
        <span v-if="isAnswered&&correctOptIdx===idx"
          class="sign-icon-span correct-sign flex justify-center align-center"
        >
          <i class="fas fa-check"></i>
        </span>
        <span v-if="isAnswered&&correctOptIdx!==idx" class="sign-icon-span wrong-sign flex justify-center align-center">
          <i class="fas fa-times"></i>
        </span>
      </button>
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
  components: {},
  data() {
    return {
      isAnswered: false,
      timer: 10,
      timerInterval: null,
      user: {}
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
      let answerInfo = {
        currAns: true,
        score: this.timer * 10
      };
      if (this.info.quiz.quests.length === this.currQuestNum + 1) {
        console.log("should dubble");
        answerInfo.score = this.timer * 10 * 2;
        console.log(answerInfo.score);
      }
      if (currAns) {
        console.log("sending", answerInfo.score);

        this.$store.dispatch({
          type: "updateAns",
          res: {
            answerInfo: answerInfo,
            userId: this.user.userId
          }
        });
      } else {
        this.$store.dispatch({
          type: "updateAns",
          res: {
            answerInfo: {
              currAns: false,
              score: 0
            },
            userId: this.user.userId
          }
        });
      }
    },
    ansStyle(idx) {
      if (!this.isAnswered) return "";
      if (idx === this.correctOptIdx) return "correct-ans";
      return "wrong-ans";
    }
  },

  destroyed() {
    clearInterval(this.timerInterval);
    if (!this.isAnswered) {
      this.$store.dispatch({
        type: "updateAns",
        res: {
          answerInfo: {
            currAns: false,
            score: 0
          },
          userId: this.user.userId
        }
      });
    }
  },
  created() {
    this.timerInterval = setInterval(() => {
      this.timer--;
    }, 1000);
    this.user = this.$store.getters.getUser;
    console.log("this.info", this.info);
  }
};
</script>

<style scoped>
.wrongAnsStyle {
  background: rgb(173, 55, 55, 0.7);
}
.correctAnsStyle {
  background: rgb(47, 149, 47, 0.7);
}
</style>
