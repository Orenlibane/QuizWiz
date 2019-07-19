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
      <p>Time To Game Start:</p>
      <div class="fs40">{{lobbyTime}}</div>
    </div>
    <div class="quiz-details-img">
      <img src="@/assets/placeholder_600x400_2.jpg" alt />
    </div>
    <div>
      <ul>
        <li v-for="(user,idx) in loggedUsers" :key="idx">{{user.nickName}} has Joined the Game</li>
      </ul>
      <button class="mid-btn">show more</button>
    </div>
    <div class="flex column justify-center align-center">
      <button @click="startGame">Start Game</button>
      <button class="mid-btn">Leave</button>
    </div>
  </section>
</template>

<script>
import quizLobby from "@/styles/components/_quiz-lobby.scss";
export default {
  props: ["info"],
  methods: {
    startGame() {
      console.log("Starting game!");
    }
  },
  computed: {
    loggedUsers() {
      return this.$store.getters.getLoggedUsers;
    },
    lobbyTime() {
      console.log("lobby countdown:", this.$store.getters.getLobbyTimer);
      return this.$store.getters.getLobbyTimer;
    }
  },

  data() {
    return {};
  }
};
</script>
