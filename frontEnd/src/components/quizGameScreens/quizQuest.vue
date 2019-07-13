<template>
  <section class="quizQuest">
    <h1>Question #{{currQuestionNum}}: {{currQuestion}}</h1>
    <div class="possible-answers" v-for="(answer,idx) in currAnswers" :key="idx" @click="chooseAnswer(idx)">
      <button>{{answer}}</button>
    </div>
    <div>correct answer idx: {{correctAnsIdx}}</div>
    </section>
</template>


<script>
export default {
  name: "quizQuest",
  props: ["info"],
  data() {
    return {
      isAnswered: false
    }
  },
  computed: {
    currQuestionNum() {
      return this.info.currentQuestion+1
    },
    currQuestion() {
      return this.info.quiz.questions[this.info.currentQuestion].question
    },
    currAnswers() {
      return this.info.quiz.questions[this.info.currentQuestion].answers
    },
    correctAnsIdx() {
      return this.info.quiz.questions[this.info.currentQuestion].currentAnswerIdx
    }
  },
  methods: {
    chooseAnswer(idx) {
      if(this.isAnswered) return
      this.isAnswered = true;
      if(idx === this.correctAnsIdx) return console.log('Correct!') 
      return console.log('Wrong!')

}
  }
};
</script>
