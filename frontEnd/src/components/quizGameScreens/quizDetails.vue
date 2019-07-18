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
      <img src="@/assets/placeholder_600x400_2.jpg" alt />
    </div>
    <div class="flex column justify-center align-center">
      <button class="mid-btn" @click="startSinglePlayer">SinglePlayer</button>
      <button class="mid-btn" @click="startMultiplayer">Multiplayer</button>
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

export default {
  components: {},
  computed: {},
  props: ["info"],
  data() {
    return {};
  },

  created() {
    console.log(this.info);
  },
  methods: {
    startSinglePlayer() {
      this.$emit("gameStage", { cmp: "quizReady" });
    },
    startMultiplayer() {
      this.$store.dispatch({ type: "changeGameStage", stage: "quizLobby" });
      let nickName = prompt("please enter a nickName");
      let playerInfo = {
        nickName: nickName,
        id: utilService.makeId()
      };
      this.info.quiz.creator = playerInfo;
      this.$store.dispatch({ type: "onCreateGame", quiz: this.info.quiz });
    }
  }
};
</script>

<style scoped>
</style>

