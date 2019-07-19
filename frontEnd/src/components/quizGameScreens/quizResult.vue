<template>
  <section class="game-results">
    <h1>results</h1>
    <h1>Your current Score is: {{userTotalScore}}</h1>

    <h3>Here are the following scores:</h3>
    <div class="fs24" v-for="(user,userIdx) in gameScores" :key="userIdx">
      <li>Name: {{user.nickName}}</li>
      <hr />
      <li v-for="(answer,answerIdx) in user.ans" :key="answerIdx">
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
    return {
      user: {}
    };
  },
  computed: {
    gameScores() {
      return this.$store.getters.getGameScores;
    },
    userTotalScore() {
      let allScores = this.$store.getters.getGameScores;
      let currentUser = allScores.find(
        user => this.user.userId === user.userId
      );
      console.log("this is the user", currentUser);
      let userTotalScore = currentUser.ans.reduce((acc, userScores) => {
        acc += userScores.score;
        return acc;
      }, 0);
      console.log("this should be the user scores", userTotalScore);

      return userTotalScore;
    }
  },
  created() {
    this.user = this.$store.getters.getUser;
  },
  methods: {}
};
</script>
