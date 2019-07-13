<template>
  <section>
    <quiz-gameboard v-if="isPlaying" :info="cmp.info"></quiz-gameboard>
    <component :is="cmp.type" @gameStage="gameSequence" :info="cmp.info" :gameRes="cmp.gameRes"  />
        <quest-timer v-if="isPlaying"
        :info="cmp.info" 
        :gameRes="cmp.gameRes" 
        @gameStage="gameSequence"
        @emitTime="getQuestTimer"
        ></quest-timer>
  </section>
</template>

<script>
// quizGameboard and questTimer give feedback to the user about his game state
import quizGameboard from "../components/quizGameboard";
import questTimer from '../components/questTimer';

//the Dynamic game screens
import quizDetails from "../components/quizGameScreens/quizDetails";
import quizEnd from "../components/quizGameScreens/quizEnd";
import quizLobby from "../components/quizGameScreens/quizLobby";
import quizResult from "../components/quizGameScreens/quizResult";
import quizReady from "../components/quizGameScreens/quizReady";
import quizQuest from "../components/quizGameScreens/quizQuest";

export default {
  name: "quizGame",
  data() {
    return {
      cmp: {
        type: "quizDetails",
        info: {
          quiz: Object,
          currentQuestion: Number,
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
      if (gameStage.answer) {
        this.cmp.gameRes.push({
          questIdx: this.cmp.gameRes.length,
          result: gameStage.answer,
          score: (gameStage.answer === 'false') ? 0 : Math.abs(this.cmp.info.timer-10) * 10
        });
      }
      this.cmp.type = gameStage.cmp;
      if (gameStage.cmp === "quizQuest") {
        this.cmp.info.currentQuestion++;
      }
    },

    getQuestTimer(gottenTime){
      this.cmp.info.timer = gottenTime
    }
  },
  computed: {
    gameState() {
      return this.cmpArr[this.gameState];
    },
    isPlaying() {
      return this.cmp.type === "quizQuest";
    }
  },
  created() {
    const quizId = this.$route.params.id;
    this.$store.dispatch({ type: "getQuiz", quizId }).then(quiz => {
      this.cmp.info = { quiz, currentQuestion: -1, timer: null };
    });
  },
  
};
</script>

<style lang="scss">
</style>