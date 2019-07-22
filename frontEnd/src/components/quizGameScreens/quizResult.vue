<template>
  <section class="game-results">
    <score-table :users="sortedUsersTotalScores"></score-table>
    <div class="table-heading flex justify-center align-center"></div>
  </section>
</template>

<script>
import scoreTable from "../scoreTable/scoreTable.vue";
export default {
  props: [],
  data() {
    return {
      user: {}
    };
  },
  computed: {
    sortedUsersTotalScores() {
      let usersTotalScores = [];
      this.gameScores.forEach(user => {
        let reducingUser = {
          nickName: user.nickName,
          totalScore: 0,
          ans: user.ans
        };
        reducingUser.ans.forEach(ans => {
          reducingUser.totalScore += ans.score;
        });
        usersTotalScores.push(reducingUser);
      });
      return usersTotalScores.sort((user1, user2) => {
        return user2.totalScore - user1.totalScore;
      });
    },

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
  components: {
    scoreTable
  },
  methods: {
    idxFormat(idx) {
      return idx < 10 ? `0${idx}` : idx;
    },
    setAvatar(nickName) {
      return "https://api.adorable.io/avatars/103/" + nickName + ".png";
    }
  }
};
</script>
