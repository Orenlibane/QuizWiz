<template>
  <section class="add-quiz">
    <div>
      <h2>The quiz</h2>
      <div>question array:</div>
    </div>
    <h3>Add a new quiz</h3>
    <div class="top-options flex column">
      <h2>
        <input type="text" placeholder="Quiz Title" v-model="newQuiz.title" />
      </h2>
      <div class="flex">
        <div class="img-container">
          <h5>Add tags</h5>
          <input type="text" v-model="tagToAdd  " placeholder="Add tags" />
          <button @click="addTag">+</button>
          <div class="flex space-between" v-for="(tag,idx) in newQuiz.tags" :key="idx">
            {{tag}}
            <button @click="removeTag(idx)">X</button>
          </div>
        </div>
        <div class="img-container">
          <h5>Add image</h5>
          <div class="addimg">+</div>
        </div>
      </div>
    </div>
    <div v-for="(quest,questIdx) in newQuiz.questions" :key="questIdx">
      <h4>Question {{questIdx+1}}</h4>
      <hr />
      <input type="text" v-model="newQuiz.questions[questIdx].question" />
      <span>
        <h5>Answers:</h5>
        <input
          v-model="newQuiz.questions[questIdx].answers[answerIdx]"
          v-for="(n,answerIdx) in 4"
          :key="answerIdx"
          type="text"
        />

        <button @click="deleteQuest">🗑️</button>
      </span>
      <div>
        <h5>Currect Answer</h5>
        <select @change="setCurrectAnswer(questIdx,$event)">
          <option>Answer</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    </div>
    <div class="flex add-btns">
      <button @click="addQuest">Add question</button>
      <button @click="addQuiz">Submit Quiz</button>
    </div>

    <footer>footer here</footer>
  </section>
</template>

<script>
import addQuiz from "@/styles/views/_add-quiz.scss";
import quizService from "@/service/quizService.js";
import utilService from "@/service/utilService.js";

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
      tagToAdd: "",
      newQuiz: {
        title: "",
        tags: [],
        createdAt: "",
        bestScore: "",
        likesCount: 0,
        questions: [
          {
            question: "",
            answers: ["", "", "", ""]
          }
        ]
      }
    };
  },
  methods: {
    addQuest() {
      var quest = { question: "", answers: ["", "", "", ""] };
      this.questNum++;
      this.newQuiz.questions.push(quest);
    },
    deleteQuest(questIdx) {
      this.newQuiz.questions.splice(questIdx, 1);
      this.questNum--;
    },
    setCurrectAnswer(questIdx, ev) {
      var value = ev.target.value;
      this.newQuiz.questions[questIdx].currentAnswerIdx = parseInt(value - 1);
    },
    addQuiz() {
      this.newQuiz._id = utilService.makeId();
      quizService.addQuiz(this.newQuiz);
      this.$router.push("/");
    },
    addTag() {
      console.log(this.newQuiz.tags);
      console.log(this.tagToAdd);
      this.newQuiz.tags.push(this.tagToAdd);
      console.log(this.newQuiz.tags);
      this.tagToAdd = "";
    },
    removeTag(idx) {
      this.newQuiz.tags.splice(idx, 1);
    }
  }
};
</script>

<style scoped>
</style>