<template>
  <section>
    <router-link to="/">
      <button class="btn-quiz">
        <i class="fas fa-backward"></i>
      </button>
    </router-link>
    <h1>Game Ended</h1>
    <div class="flex column both-align-center quiz-end">
      <h1 class="score-prec">{{correctAnsPercentage}}%</h1>
      <h2>{{correctAnsPercentage | grade}}</h2>
      <h1>Your Total Score is: {{userTotalScore}}</h1>
      <h1>Total right answers {{userTotalRightAnswers}}/{{currUserAnswers.ans.length}}</h1>
      <h1 class="fs30">All users Answers</h1>
      <div v-for="(user,userIdx) in gameScores" :key="userIdx">
        <li>Name: {{user.nickName}}</li>
        <hr />
        <li v-for="(answer,answerIdx) in user.ans" :key="answerIdx">
          Answer {{answerIdx+1}}:{{answer.currAns}}
          Score :{{answer.score}}
        </li>
        <hr />
      </div>
      <button class="big-btn">Like</button>
      <button @click="toggleQuests" class="show-questions-btn">show Questions</button>
    </div>

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
import global from "@/styles/global.scss";
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
  },
  data() {
    return {
      showQuests: false,
      user: {},
      currUserAnswers: {}
    };
  },
  computed: {
    quests() {
      return this.info.quiz.quests;
    },
    correctAnsPercentage() {
      return (
        (this.userTotalRightAnswers / this.currUserAnswers.ans.length) * 100
      );
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
    }
  }
};
</script>

