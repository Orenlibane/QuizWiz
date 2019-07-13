<template>
  <section>
    <component @gameStage="gameSequnce" :info="cmp.info" :is="cmp.type" />
  </section>
</template>

<script>
import quizDetails from "../components/quizGameScreens/quizDetails";
import quizEnd from "../components/quizGameScreens/quizEnd";
import quizLobby from "../components/quizGameScreens/quizLobby";
import quizResult from "../components/quizGameScreens/quizResult";
import quizReady from "../components/quizGameScreens/quizReady";
import quizQueast from "../components/quizGameScreens/quizQuest";

export default {
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
        "quizQueast",
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
    quizQueast
  },
  methods: {
    gameSequnce(gameStage) {
      this.cmp.type = gameStage;
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
      this.cmp.info = { quiz };
      console.log(this.cmp);
    });
  }
};
</script>

<style lang="scss">
</style>