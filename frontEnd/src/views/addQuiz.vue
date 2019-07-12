<template>
  <section class="home">
    <router-link to="/">Back to home</router-link>
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

        <button @click="deleteQuest">🗑️</button>
      </span>
      <div>
        <h5>Currect Answer</h5>
        <select @change="setCurrectAnswer(questIdx,$event)">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
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
        title: "",
        tags: "",
        createdAt: "",
        bestScore: "",
        likesCount: 0,
        currectAnswer: 0,
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
    },
    setCurrectAnswer(questIdx, ev) {
      console.log(ev.target.value);
      console.log("questIdx", questIdx);
      console.log("the quiz", this.quiz);
      var value = ev.target.value;
      this.quiz.quests[questIdx].currectAnswer = value;
    }
  }
};
</script>

<style scoped>
</style>