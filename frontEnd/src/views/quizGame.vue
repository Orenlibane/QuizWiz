<template>
  <section>
    <component :is="cmp.type" />
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
        type: "quizLobby",
        info: "",
        inform: "func"
      },
      cmpArr: [
        "quizDetails",
        "quizLobby",
        "questScreen",
        "quizEnd",
        "quizReady",
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
  methods: {},
  computed: {
    gameState() {
      return this.cmpArr[this.gameState];
    }
  }
};
</script>

<style lang="scss">
</style>