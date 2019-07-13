<template>
  <div class="quiz-libary">
    <h1>This is quiz libary page</h1>
  </div>
</template>

<script>
import global from "@/styles/global.scss";
export default {
  props: [],
  components: {},
  created() {
    this.$store.dispatch({ type: "loadQuizes" });
  },
  computed: {
    quizesToShow() {
      return this.$store.getters.getQuizes;
    }
  }
};
</script>