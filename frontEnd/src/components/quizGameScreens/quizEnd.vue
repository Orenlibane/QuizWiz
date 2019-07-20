<template>
  <section class>
    <router-link to="/">
      <button class="btn-quiz">
        <i class="fas fa-backward"></i>
      </button>
    </router-link>
    <h1>Game Ended</h1>
    <div class="fs20 flex column justify-center align-center">
      <h1 class="score-prec">{{correctAnsPercentage}}%</h1>
      <h2>{{correctAnsPercentage | grade}}</h2>
      <h1>Your Total Score is: {{userTotalScore}}</h1>
      <h1>Total right answers {{userTotalRightAnswers}}/{{currUserAnswers.ans.length}}</h1>
      <h1 class="fs30">All users Answers</h1>
    </div>
    <score-table :users="sortedUsersTotalScores"></score-table>
    <div v-if="showQuests" class="questions-sum flex column">
      <button @click="toggleQuests" class="show-questions-btn">show Questions:</button>
      <ul class="clean-list" v-for="(quest, idx) in quests" :key="idx">
        <li class="flex space-between">
          <span>Question #{{idx+1}} : {{quest.txt}}</span>
          <span>{{showAnswer(idx) | answerFormat}}</span>
        </li>
      </ul>
    </div>
    <router-link to="/">Back Home</router-link>
  </section>
</template>

<script>
import scoreTable from '../scoreTable/scoreTable.vue'
import filters from "@/filters.js";
export default {
  props: {
    gameRes: {
      type: Array
    },
    info: {
      type: Object
    }
  },
  created() {
    this.user = this.$store.getters.getUser;
    let allScores = this.$store.getters.getGameScores;
    this.currUserAnswers = allScores.find(
      user => this.user.userId === user.userId
    );

    //TODO: should change -> should depened on server time
    // setTimeout(() => {
    //   this.$router.push("/");
    // }, 7000);
  },
  data() {
    return {
      showQuests: false,
      user: {},
      currUserAnswers: {}
    };
  },
  components:{
    scoreTable
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
    quests() {
      return this.info.quiz.quests;
    },
    correctAnsPercentage() {
      return parseFloat(
        (this.userTotalRightAnswers / this.currUserAnswers.ans.length) * 100
      ).toFixed(0);
    },
    userTotalScore() {
      let userTotalScore = this.currUserAnswers.ans.reduce(
        (acc, userScores) => {
          acc += userScores.score;
          return acc;
        },
        0
      );

      return userTotalScore;
    },
    userTotalRightAnswers() {
      let userTotalRightAnswers = this.currUserAnswers.ans.reduce(
        (acc, userScores) => {
          if (userScores.currAns) {
            acc++;
          }
          return acc;
        },
        0
      );
      return userTotalRightAnswers;
    },
    gameScores() {
      return this.$store.getters.getGameScores;
    }
  },
  methods: {
    toggleQuests() {
      this.showQuests = !this.showQuests;
    },
    idxFormat(idx) {
      return idx < 10 ? `0${idx}` : idx;
    },
    setAvatar(nickName) {
      return "https://api.adorable.io/avatars/103/" + nickName + ".png";
    }
  }
};
</script>




