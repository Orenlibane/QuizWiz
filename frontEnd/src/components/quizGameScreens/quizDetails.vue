<template>
  <section class="flex">
    <section class="quiz-details align-both column">
      <router-link to="/">
        <button class="btn-quiz">back</button>
      </router-link>
      <img
        class="quiz-details-img"
        src="https://i.dailymail.co.uk/i/pix/2014/12/05/23C714C900000578-0-image-m-21_1417800566578.jpg"
        alt
      />
      <div class="flex add-btns">
        <button>Join Game</button>
        <button @click="startSinglePlayer">Start Game</button>
        <button>Back</button>
      </div>
    </section>
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

