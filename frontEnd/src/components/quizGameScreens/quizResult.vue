<template>
  <section class="game-results">
    <div class="score-label flex justify-center align-center column">
      <p>Correct Answer</p>
      <span class="center">{{correctAnswer}}</span>
    </div>
    <score-table :users="sortedUsersTotalScores"></score-table>
    <div class="table-heading flex justify-center align-center"></div>
  </section>
</template>

<script>
import scoreTable from "../scoreTable/scoreTable.vue";
export default {
  props: {
    info: {
      type: Object
    }
  },
  data() {
    return {
      user: {},
      allScores: []
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
      let currentUser = this.allScores.find(
        user => this.user.userId === user.userId
      );
      let userTotalScore = currentUser.ans.reduce((acc, userScores) => {
        acc += userScores.score;
        return acc;
      }, 0);

      return userTotalScore;
    },
    correctOptIdx() {
      if (this.info.currQuest === 0)
        return this.info.quiz.quests[this.info.currQuest].correctOptIdx;
      return this.info.quiz.quests[this.info.currQuest - 1].correctOptIdx;
    },
    correctAnswer() {
      if (this.info.currQuest === 0)
        return this.info.quiz.quests[this.info.currQuest].opts[
          this.correctOptIdx
        ];
      return this.info.quiz.quests[this.info.currQuest - 1].opts[
        this.correctOptIdx
      ];
    }
  },

  mounted() {},
  created() {
    this.user = this.$store.getters.getUser;
    this.allScores = this.$store.getters.getGameScores;
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

<style scoped lang="scss">
.correct-answer {
  color: white;
}
</style>