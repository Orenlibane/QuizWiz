<template>
  <section class="add-quiz">
    <router-link to="/">Back to home</router-link>
    <div>efwfwefwef</div>
    <div class="flex add-btns">
      <button>Enter lobby</button>
      <button>Leave</button>
    </div>
  </section>
</template>

<script>
// import addQuiz from "@/styles/views/_add-quiz.scss";
import quizService from "@/service/quizService.js";
import utilService from "@/service/utilService.js";

export default {
  name: "home",
  components: {},
  computed: {},
  props: ["gameQuiz"],
  data() {
    return {};
  },

  created() {},
  methods: {}
};
</script>

<style scoped>
</style>