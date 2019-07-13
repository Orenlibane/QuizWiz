<template>
  <section class="game-results">
    <h1>results</h1>
    <div v-for="(quest,idx) in info.quiz.questions" :key="idx" class="question-result">
      Question: {{info.quiz.questions[idx]}}
      Answer: ""
    </div>
    <button>Back to HomePage</button>
  </section>
</template>

<script>
export default {
  props: ["info"],
  methods: {
    leaveGame() {
      // update the user score on store.
      this.$router.push("/");
    }
  }
};
</script>
