<template>
  <section class="quiz-details">
    <router-link to="/">Back to home</router-link>
    <h2 v-if="info.quiz">Quiz Title: {{info.quiz.title}}</h2>
    <div v-if="info.quiz">
      <img
        src="https://i.dailymail.co.uk/i/pix/2014/12/05/23C714C900000578-0-image-m-21_1417800566578.jpg"
        alt
      />
    </div>
    <h3 v-if="info.quiz">Quiz tags: {{info.quiz.tags}}</h3>
    <h3 v-if="info.quiz">Quiz Creator:</h3>
    <h3 v-if="info.quiz">Number of questions: {{info.quiz.questions.length}}</h3>
    <h3 v-if="info.quiz">Quiz likes: {{info.quiz.likesCount}}</h3>
    <div class="flex add-btns">
      <button>Join Game</button>
      <button @click="startSinglePlayer">Start Game</button>
      <button>Back</button>
    </div>
  </section>
</template>

<script>
import quizdet from "@/styles/components/_quiz-det.scss";
import quizService from "@/service/quizService.js";
import utilService from "@/service/utilService.js";

export default {
  name: "home",
  components: {},
  computed: {},
  props: ["info"],
  data() {
    return {};
  },

  created() {},
  methods: {
    startSinglePlayer() {
      this.$emit("gameStage", {cmp: "quizReady"});
    }
  }
};
</script>

<style scoped>
</style>