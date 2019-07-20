<template>
  <section class="quiz-details">
    <router-link to="/">
      <button class="small-btn">
        <i class="fas fa-arrow-left"></i>
      </button>
    </router-link>
    <div class="flex justify-center align-center column">
      <h2>{{info.quiz.name}}</h2>
      <p>by {{info.quiz.creatorName}}</p>
    </div>
    <div class="quiz-details-img">
      <!-- <img src="@/assets/placeholder_600x400_2.jpg" alt /> -->
    </div>
    <div class="flex column justify-center align-center">
      <!-- <button class="mid-btn" @click="startGame('single')">SinglePlayer</button> -->
      <button class="mid-btn" @click="startGame('mult')">Multiplayer</button>
    </div>
    <div class="details-footer layout-container flex justify-cener align-center space-between">
      <div class="tags-show flex">
        Tags:
        <div v-for="(tag, idx) in info.quiz.tags" :key="idx">{{tag}}-</div>
      </div>
      <div class="like-box-container flex">
        <button class="quiz-details-like-btn">
          <i class="fas fa-thumbs-up"></i>
        </button>
        <span class="quiz-details-like-count">{{info.quiz.likesCount}}</span>
      </div>
    </div>
  </section>
</template>

<script>
import quizService from "@/service/quizService.js";
import utilService from "@/service/utilService.js";
const Swal = require("sweetalert2");

export default {
  components: {},
  computed: {},
  props: ["info"],
  data() {
    return {};
  },

  methods: {
    async startGame(gameType) {
      this.$store.dispatch({ type: "changeGameStage", stage: "quizLobby" });
      let nickName = await Swal.fire({
        title: "Enter your Guest NickName",
        input: "text"
      });
      let infoToLog = {
        userId: utilService.makeId(),
        nickName: nickName.value,
        ans: []
      };
      this.info.quiz.creator = infoToLog;
      // console.log('quizes after adding user:', this.$store.getters.getQuizes);
      this.$store.dispatch({ type: "setUser", infoToLog });
      if ((gameType = "single")) {
        this.info.quiz.gameType = "single";
        this.$store.dispatch({ type: "onCreateGame", quiz: this.info.quiz });
      } else {
        this.info.quiz.gameType = "mult";
        this.$store.dispatch({ type: "onCreateGame", quiz: this.info.quiz });
      }
    }
  }
};
</script>

<style scoped>
</style>

