<template>
  <section class="home">
    <nav>Nav here</nav>
    <div>
      <h2>The quiz</h2>
      <div>question array:</div>
    </div>
    <h3>Add a new quiz</h3>
    <div class="top-options">
      <div class="img-container">
        <h5>select tags</h5>
        <input type="text" placeholder="Add tags" />
        <button>+</button>
      </div>
      <div class="img-container">
        <h5>Add image</h5>
        <div class="addimg">+</div>
      </div>
    </div>
    <div v-for="(quest,questIdx) in questNum" :key="questIdx">
      <h4>Question {{questIdx+1}}</h4>
      <hr />
      <input type="text" v-model="quiz.quests[questIdx].title" />
      <span>
        <h5>Answers:</h5>
        <input
          v-model="quiz.quests[questIdx][answerIdx]"
          v-for="(n,answerIdx) in 4"
          :key="answerIdx"
          type="text"
        />
        <button @click="deleteQuest">X</button>
      </span>
    </div>
    <button @click="addQuest">Add question</button>

    <footer>footer here</footer>
  </section>
</template>

<script>
import addQuiz from "@/styles/views/_add-quiz.scss";
export default {
  name: "home",
  components: {},
  computed: {
    // questNumUpdated() {
    //   return this.questNum;
    // }
  },
  data() {
    return {
      questNum: 4,
      quiz: {
        quests: [
          {
            title: "",
            answers: ["", "", "", ""]
          },
          {
            title: "",
            answers: ["", "", "", ""]
          },
          {
            title: "",
            answers: ["", "", "", ""]
          },
          {
            title: "",
            answers: ["", "", "", ""]
          }
        ]
      }
    };
  },
  methods: {
    addQuest() {
      var quest = ["", "", "", ""];
      this.questNum++;
      this.quiz.quests.push(quest);
    },
    deleteQuest(questIdx) {
      this.quiz.quests.splice(questIdx, 1);
      this.questNum--;
    }
  }
};
</script>

<style scoped>
</style>