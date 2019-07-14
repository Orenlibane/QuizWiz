<template>
  <section class="flex both-align-center column">
    <div class="quiz-details">
      <router-link to="/">
        <button class="btn-quiz">
          <i class="fas fa-backward"></i>
        </button>
      </router-link>
      <h1 class="center">{{info.quiz.title}}</h1>
      <img
        class="quiz-details-img"
        src="https://catspro.com/wp-content/uploads/2018/11/ugly-sphynx-695x599.jpg"
        alt
      />
      <div class="flex add-btns column both-align-center">
        <button @click="startSinglePlayer">Start Game</button>
        <button>Join Game</button>
      </div>
      <div v-if="info.quiz" class="flex space-around">
        <div class="tags-show flex">
          Tags:
          <div v-for="(tag, idx) in info.quiz.tags" :key="idx">{{tag}}-</div>
        </div>
        <div class="like-show flex flex-start">
          <div>{{info.quiz.likesCount}}</div>
          <i class="fas fa-thumbs-up"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import global from "@/styles/global.scss";
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
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 3rem;
  margin: 0;
}
</style>

