<template>
  <section>
    <router-link to="/">
      <button class="btn-quiz">
        <i class="fas fa-backward"></i>
      </button>
    </router-link>
    <div v-if="!showQuests" class="flex column both-align-center quiz-end">
      <!-- <h1 class="score-prec">{{correctAnsPercentage}}%</h1> -->
      <h1>Your Total Score is: {{userTotalScore}}</h1>

      <!-- <h3>You had {{correctAnsCount}} correct answers</h3> -->
      <!-- <h3>{{correctAnsPercentage | grade}}</h3> -->
      <!-- <h3>Your Score: {{score}}</h3> -->
      <h3>Game Ended</h3>
      <h3>Quiz by: Creator of the game</h3>
      <div v-for="(player,playerIdx) in gameScores" :key="playerIdx">
        <li>Name: {{player.nickName}}</li>
        <hr />
        <li v-for="(answer,answerIdx) in player.ans" :key="answerIdx">
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
    console.log("END GAME HERE");
  },
  data() {
    return {
      showQuests: false
    };
  },
  computed: {
    quests() {
      return this.info.quiz.quests;
    },
    userTotalScore() {
      return this.$store.getters.userTotalScore;
    },
    gameScores() {
      return this.$store.getters.getGameScores;
    },
    score() {
      return this.gameRes.reduce((acc, ans) => {
        acc += ans.score;
        return acc;
      }, 0);
    },
    correctAnsPercentage() {
      return Math.round((this.correctAnsCount / this.quests.length) * 100);
    },
    correctAnsCount() {
      let correctAnsCount;
      return this.gameRes.reduce((acc, ans) => {
        if (ans.result === "true") acc++;
        return acc;
      }, 0);
    },
    wrongAnsCount() {
      let wrongAnsCount;
      return this.gameRes.reduce((acc, ans) => {
        if (ans.result === "false") acc++;
        return acc;
      }, 0);
    },
    total() {
      return this.gameRes.length;
    }
  },
  methods: {
    showAnswer(idx) {
      return this.gameRes[idx].result;
    },
    toggleQuests() {
      this.showQuests = !this.showQuests;
    }
  }
};
</script>

