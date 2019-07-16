<template>
  <section class="flex both-align-center column container">
    <div class="lobby flex column space-around center">
      <h2>QUIZ TITLE</h2>
      <h1>{{getTime}}</h1>
      <!-- server time to start game -->
      <h3>players X/N</h3>

      <div class="lobby-img flex column">
        <img
          src="https://i.dailymail.co.uk/i/pix/2014/12/05/23C714C900000578-0-image-m-21_1417800566578.jpg"
          alt
        />
      </div>
      <div class="lobby-chat">
        <ul class="chat clean-list">
          <li>oren has joined....</li>
        </ul>
      </div>
      <router-link to="/">
        <button>Leave Quiz lobby</button>
      </router-link>
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
