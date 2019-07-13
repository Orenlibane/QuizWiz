<template>
  <section>
    <quiz-gameboard v-if="isPlaying" :info="cmp.info"></quiz-gameboard>
    <component @gameStage="gameSequence" :info="cmp.info" :gameRes="cmp.gameRes" :is="cmp.type" />
  </section>
</template>

<script>
import quizGameboard from "../components/quizGameboard";
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
          currentQuestion: Number
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
    quizGameboard
  },
  methods: {
    gameSequence(gameStage) {
      if (gameStage.answer) {
        console.log("There is an answer! it is:", gameStage.answer);
        console.log("game res is:", this.cmp.gameRes);
        this.cmp.gameRes.push({
          questIdx: this.cmp.gameRes.length,
          result: gameStage.answer
        });
        console.log("game answers so far:", this.cmp.gameRes);
      }
      this.cmp.type = gameStage.cmp;
      if (gameStage.cmp === "quizQuest") {
        this.cmp.info.currentQuestion++;
      }
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
    console.log("here");
    const quizId = this.$route.params.id;
    this.$store.dispatch({ type: "getQuiz", quizId }).then(quiz => {
      this.cmp.info = { quiz, currentQuestion: -1 };
    });
  }
};
</script>

<style lang="scss">
</style>