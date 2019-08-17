<template>
  <section>
    <div class="quiz-img" :style="{ backgroundImage: 'url(' + info.quiz.imgUrl + ')' }"></div>

    <div class="quest-header flex justify-center align-center column" :class="isBonus">
      <h1 v-if="info.quiz.quests.length ===currQuestNum+1">Bonus Round!</h1>
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
        <span
          v-if="isAnswered&&correctOptIdx===idx"
          class="sign-icon-span correct-sign flex justify-center align-center animated bounce delay-2s"
        >
          <i class="fas fa-check"></i>
        </span>

        <span
          v-if="isAnswered&&correctOptIdx!==idx"
          class="sign-icon-span wrong-sign flex justify-center align-center animated bounce delay-2s"
        >
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
      user: {},
      rightAnswerInfo: {
        currAns: true,
        score: ""
      },
      wrongAnswerInfo: {
        currAns: false,
        score: 0
      },
      res: {
        answerInfo: "",
        userId: ""
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
    },
    isBonus() {
      return this.info.quiz.quests.length === this.currQuestNum + 1
        ? "bonus-bg"
        : "";
    }
  },
  methods: {
    //logic for the choosen Answer
    chooseAns(idx) {
      if (this.isAnswered) return;
      this.isAnswered = true;
      let currAns = idx === this.correctOptIdx;

      //Distributing the scores
      this.info.quiz.quests.length === this.currQuestNum + 1
        ? (this.rightAnswerInfo.score = this.timer * 20)
        : (this.rightAnswerInfo.score = this.timer * 10);

      //Building and Defining the Res the Res

      currAns
        ? (this.res.answerInfo = this.rightAnswerInfo)
        : (this.res.answerInfo = this.wrongAnswerInfo);

      console.log(this.res);
      this.$store.dispatch({ type: "updateAns", res: this.res });
    },
    ansStyle(idx) {
      if (!this.isAnswered) return "";
      if (idx === this.correctOptIdx) return "correct-ans";
      return "wrong-ans";
    }
  },

  destroyed() {
    //handling the answering logic for multiplayer Game
    clearInterval(this.timerInterval);
    if (!this.isAnswered) {
      this.res.answerInfo = this.wrongAnswerInfo;
      this.$store.dispatch({ type: "updateAns", res: this.res });
    }
  },
  created() {
    this.user = this.$store.getters.getUser;
    //creating the basic Response
    this.res.userId = this.user.userId;

    //handling the client side showen timer
    this.timerInterval = setInterval(() => {
      this.timer--;
      if (this.info.quiz.gameType === "single" && this.timer < 1) {
        //handling the answering logic for no answer on single Game
        if (!this.isAnswered) {
          this.res.answerInfo = this.wrongAnswerInfo;
          this.$store.dispatch({ type: "updateAns", res: this.res });
        }
        this.timer = 10;
        this.isAnswered = false;
      }
    }, 1000);
  }
};
</script>

<style scoped>
</style>
