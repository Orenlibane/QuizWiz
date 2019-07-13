<template>
  <section>
    <h1>question Number: {{cmp.info.currentQuestion +1}}</h1>

    <component @gameStage="gameSequence" :info="cmp.info" :is="cmp.type" />
  </section>
</template>

<script>
import quizDetails from "../components/quizGameScreens/quizDetails";
import quizEnd from "../components/quizGameScreens/quizEnd";
import quizLobby from "../components/quizGameScreens/quizLobby";
import quizResult from "../components/quizGameScreens/quizResult";
import quizReady from "../components/quizGameScreens/quizReady";
import quizQuest from "../components/quizGameScreens/quizQuest";

export default {
  name: 'quizGame'
  ,
  data() {
    return {
      cmp: {
        type: "quizDetails",
        info: {},
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
    quizQuest
  },
  methods: {
    gameSequence(gameStage) {
      this.cmp.type = gameStage;
      if (gameStage === "quizQuest") {
        this.cmp.info.currentQuestion++;
      }
    }
  },
  computed: {
    gameState() {
      return this.cmpArr[this.gameState];
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