<template>
  <section class="game-results">
    <h1>results</h1>
    <h1>Your current Score is: {{userTotalScore}}</h1>

    <h3>Here are the following scores:</h3>
    <div v-for="(player,playerIdx) in gameScores" :key="playerIdx">
      <li>Name: {{player.nickName}}</li>
      <hr />
      <li v-for="(answer,answerIdx) in player.ans" :key="answerIdx">
        Answer {{answerIdx+1}}:{{answer.currAns}}
        Score :{{answer.score}}
      </li>
      <hr />
    </div>
  </section>
</template>

<script>
export default {
  props: [],
  data() {
    return {};
  },
  computed: {
    gameScores() {
      return this.$store.getters.getGameScores;
    },
    userTotalScore() {
      return this.$store.getters.userTotalScore;
    }
  },
  methods: {},
  created() {}
};
</script>
