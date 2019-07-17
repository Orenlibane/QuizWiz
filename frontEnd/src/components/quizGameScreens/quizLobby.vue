<template>
  <section class="layout-container">
    <router-link to="/">
      <button class="small-btn">
        <i class="fas fa-arrow-left"></i>
      </button>
    </router-link>
    <div class="flex justify-center column align-center">
      <h2>You Have Joined {{info.quiz.name}}</h2>
      <p>by {{info.quiz.creatorName}}</p>
    </div>
    <div class="quiz-details-img">
      <img src="@/assets/placeholder_600x400_2.jpg" alt />
    </div>
    <div>
      <p>oren joined</p>
      <p>oren joined</p>
      <p>oren joined</p>
      <button class="mid-btn">show more</button>
    </div>
    <span>00:59</span>
    <div class="flex column justify-center align-center">
      <button class="mid-btn" @click="startSinglePlayer">Leave</button>
      <!-- <button class="mid-btn" @click="startMultiplayer">Start Game</button> -->
    </div>
  </section>
</template>

<script>
import quizLobby from "@/styles/components/_quiz-lobby.scss";
export default {
  props: ["info"],
  methods: {},
  computed: {
    getTime() {
      return this.$store.getters.getTime;
    }
  },
  created() {},
  data() {
    return {};
  }
};
</script>
