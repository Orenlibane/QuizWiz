<template>
  <section class="quizQuest flex both-align-center column">
    <h1>Question #{{currQuestionNum}}: {{currQuestion}}</h1>
    <div class="answers flex wrap">
      <div
        class="possible-answers"
        v-for="(answer,idx) in currAnswers"
        :key="idx"
        @click="chooseAnswer(idx)"
      >
        <button>{{answer}}</button>
      </div>
    </div>
    <div>correct answer idx: {{correctAnsIdx}}</div>
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
      if (idx === this.correctAnsIdx) {
        console.log("Correct!");
      } else {
        console.log("wrong");
      }
      setTimeout(() => {
        this.isAnswered = false;
        this.$emit("gameStage", "quizQuest");
      }, 1000);
    }
  }
};
</script>
