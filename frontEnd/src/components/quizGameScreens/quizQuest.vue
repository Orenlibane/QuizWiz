<template>
  <section class="quizQuest flex both-align-center column">
    <h1 class="question-render">{{currQuest}}</h1>
    <div class="answers">
      <div
        class="possible-answers"
        v-for="(opt,idx) in currOpts"
        :key="idx"
        @click="chooseAns(idx)"
      >
        <button :class="ansStyle(idx)">{{opt}}</button>
      </div>
    </div>
  </section>
</template>


<script>
import global from "@/styles/global.scss";
export default {
  name: "quizQuest",
  props: {
    info: {
      type: Object
    }
  },
  data() {
    return {
      isAnswered: false
    };
  },
  computed: {
    currQuestNum() {
      return this.info.currQuest + 1;
    },
    currQuest() {
      return this.info.quiz.quests[this.info.currQuest].txt;
    },
    currOpts() {
      return this.info.quiz.quests[this.info.currQuest].opts;
    },
    correctOptIdx() {
      return this.info.quiz.quests[this.info.currQuest].correctOptIdx;
    }
  },
  methods: {
    chooseAns(idx) {
      if (this.isAnswered) return;
      this.isAnswered = true;
      let currAns = idx === this.correctOptIdx;
      setTimeout(() => {
        if (this.info.currQuest + 1 === this.info.quiz.quests.length)
          return this.$emit("gameStage", { cmp: "quizEnd", ans: "" + currAns });
        this.isAnswered = false;
        // this.$emit("ans")
        this.$emit("gameStage", { cmp: "quizQuest", ans: "" + currAns });
      }, 1000);
    },
    ansStyle(idx) {
      if (!this.isAnswered) return "";
      if (idx === this.correctOptIdx) return "correctAnsStyle";
      return "wrongAnsStyle";
    }
  },
  mounted() {
    console.log("the info:", this.info);
  },
  destroyed() {
    console.log("Quiz Game got destroyed");
  },
  // updated(){

  // }
};
</script>

<style scoped>
.wrongAnsStyle {
  background: red;
}

.correctAnsStyle {
  background: green;
}
</style>
