<template>
  <section class="quiz-details layout-container">
    <div class="quiz-details-header flex justify-center align-center">
      <div class="quiz-img" :style="{ backgroundImage: 'url(' + info.quiz.imgUrl + ')' }"></div>
    </div>

    <div class="quiz-details-action flex justify-center align-center column">
      <span>by {{info.quiz.creatorName}}</span>
      <h2>{{info.quiz.name}}</h2>
      <div class="flex justify-center align-center column">
        <h2 class="black-heading">{{lobbyTime}}</h2>
      </div>
      <div class="flex justify-center align-center column">
        <h2 class="black-heading">Joined:</h2>
        <div class="join-list">
          <div class="orange-headline" v-for="(user,idx) in loggedUsers" :key="idx">{{user.nickName}}</div>
        </div>
      </div>
      <div class="tags-show flex">
        <div v-for="(tag, idx) in info.quiz.tags" :key="idx">{{tag}}</div>
      </div>
    </div>
  </section>
</template>

<script>
import quizLobby from "@/styles/components/_quiz-lobby.scss";
import Swal from "sweetalert2";
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
      return this.$store.getters.getLobbyTimer;
    }
  },

  data() {
    return {
      imgUrl:
        "https://images.unsplash.com/photo-1563454758691-702be3d2e2b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
    };
  }
};
</script>
