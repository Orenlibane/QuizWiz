<template>
  <section class="quizQuest flex layout-container both-align-center column">
    <h1 class="question-render">{{currQuestion}}</h1>
    <div class="answers">
      <div
        class="possible-answers"
        v-for="(answer,idx) in currAnswers"
        :key="idx"
        @click="chooseAnswer(idx)"
      >
        <button :class="ansStyle(idx)">{{answer}}</button>
      </div>
    </div>
  </section>
</template>


<script>
import global from "@/styles/global.scss";
export default {
  name: "quizQuest",
  props: ["info"],
  data() {
    return {
      isAnswered: false
    };
  },
  computed: {
    currQuestionNum() {
      return this.info.currentQuestion + 1;
    },
    currQuestion() {
      return this.info.quiz.questions[this.info.currentQuestion].question;
    },
    currAnswers() {
      return this.info.quiz.questions[this.info.currentQuestion].answers;
    },
    correctAnsIdx() {
      return this.info.quiz.questions[this.info.currentQuestion]
        .currentAnswerIdx;
    }
  },
  methods: {
    chooseAnswer(idx) {
      if (this.isAnswered) return;
      this.isAnswered = true;
      let ans = idx === this.correctAnsIdx;
      setTimeout(() => {
        if (this.info.currentQuestion + 1 === this.info.quiz.questions.length)
          return this.$emit("gameStage", { cmp: "quizEnd", answer: "" + ans });
        this.isAnswered = false;
        // this.$emit("ans")
        this.$emit("gameStage", { cmp: "quizQuest", answer: "" + ans });
      }, 1000);
    },
    ansStyle(idx) {
      if (!this.isAnswered) return "";
      if (idx === this.correctAnsIdx) return "correctAnsStyle";
      return "wrongAnsStyle";
    }
  },
  destroyed() {
    console.log("Quiz Game got destroyed");
  }
};
</script>

