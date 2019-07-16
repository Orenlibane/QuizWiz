


<template>
  <section class="layout-container">
    <quiz-gameboard v-if="isPlaying" :info="cmp.info"></quiz-gameboard>
    <component :is="gameStage" :info="cmp.info" :currQuest="currQuest" :gameRes="cmp.gameRes" />
    <!-- <quest-timer
      v-if="isPlaying"
      :info="cmp.info"
      :gameRes="cmp.gameRes"
      @gameStage="gameSequence"
      @emitTime="getQuestTimer"
    ></quest-timer>-->
  </section>
</template>

<script>
// quizGameboard and questTimer give feedback to the user about his game state
import quizGameboard from "../components/quizGameboard";
import questTimer from "../components/questTimer";

//the Dynamic game screens
import quizDetails from "../components/quizGameScreens/quizDetails";
import quizEnd from "../components/quizGameScreens/quizEnd";
import quizLobby from "../components/quizGameScreens/quizLobby";
import quizResult from "../components/quizGameScreens/quizResult";
import quizReady from "../components/quizGameScreens/quizReady";
import quizQuest from "../components/quizGameScreens/quizQuest";

//Event bus
import eventBus, { GAME_ON } from "@/event-bus.js";

export default {
  name: "quizGame",
  data() {
    return {
      cmp: {
        type: "quizDetails",
        info: {
          quiz: Object,
          currQuest: Number,
          timer: Number
        },
        gameRes: [],
        inform: "func"
      },
      cmpArr: [
        "quizDetails",
        "quizLobby",
        "quizReady",
        "quizQuest",
        "quizEnd",
        "quizResult"
      ]
    };
  },
  components: {
    quizDetails,
    quizEnd,
    quizLobby,
    quizResult,
    quizReady,
    quizQuest,
    quizGameboard,
    questTimer
  },
  methods: {
    gameSequence(gameStage) {
      if (gameStage.ans) {
        this.cmp.gameRes.push({
          questIdx: this.cmp.gameRes.length,
          result: gameStage.ans,
          score: gameStage.ans === "false" ? 0 : this.cmp.info.timer * 10
        });
      }
      // this.cmp.type = gameStage.cmp;
      // if (gameStage.cmp === "quizQuest") {
      //   this.cmp.info.currQuest++;
      // }
    },

    getQuestTimer(time) {
      this.cmp.info.timer = time;
    }
  },
  computed: {
    gameStage() {
      return this.$store.getters.gameStage;
    },
    gameState() {
      return this.cmpArr[this.gameState];
    },
    isPlaying() {
      return this.cmp.type === "quizQuest";
    },
    currQuest() {
      // console.log("ssssss", this.$store.getters.currentQuestion);
      // this.cmp.info.currQuest = this.$store.getters.currentQuestion;
      return this.$store.getters.currentQuestion;
    }
  },
  watch: {
    "$store.getters.currentQuestion": function(newVal, oldVal) {
      console.log(this.cmp.info);
      console.log("new val", newVal);
      this.cmp.info.currQuest = newVal.currentQuestion;
    }
  },
  async created() {
    const quizId = this.$route.params.id;
    var quiz = await this.$store.dispatch({ type: "getQuiz", quizId });
    this.cmp.info = { quiz, currQuest: 0, timer: null };

    //Remove footer and header
    eventBus.$emit(GAME_ON);
  }
};
</script>

<style lang="scss">
</style>