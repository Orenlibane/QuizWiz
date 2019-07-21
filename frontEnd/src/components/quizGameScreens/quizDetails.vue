<template>
  <section class="quiz-details flex justify-center align-center layout-container">
    <div class="quiz-img" :style="{ backgroundImage: 'url(' + info.quiz.imgUrl + ')' }"></div>
    <div class="quiz-details-action flex justify-center align-center column">
      <span>by {{info.quiz.creatorName}}</span>
      <h2>{{info.quiz.name}}</h2>
      <button class="pink-btn" @click="startGame('single')">Single Player</button>
      <button class="pink-btn" @click="startGame('mult')">Multiplayer</button>
      <router-link to="/">
        <button class="pink-btn">back</button>
      </router-link>
      <div class="tags-show flex">
        Tags:
        <div v-for="(tag, idx) in info.quiz.tags" :key="idx">{{tag}}-</div>
      </div>
    </div>
  </section>
</template>

<script>
import quizService from "@/service/quizService.js";
import utilService from "@/service/utilService.js";
import Swal from "sweetalert2";

export default {
  components: {},
  computed: {},
  props: ["info"],
  data() {
    return {
      imgUrl:
        "https://images.unsplash.com/photo-1563454758691-702be3d2e2b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
    };
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
      if (gameType === "single") {
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

