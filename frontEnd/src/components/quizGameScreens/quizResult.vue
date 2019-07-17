<template>
  <section class="game-results">
    <h1>results</h1>
    <h2>You did: Bad/good/great?</h2>

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
    }
  },
  methods: {},
  created() {}
};
</script>
