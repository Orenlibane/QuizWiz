<template>
  <section class="add-quiz">
    <div>
      <h2>The quiz</h2>
    </div>
    <h3>Add a new quiz</h3>
    <div class="top-options flex column">
      <h2>
        <input type="text" placeholder="Quiz Title" v-model="loadedQuiz.name" />
      </h2>
      <div class="flex">
        <div class="img-container">
          <h5>Add tags</h5>
          <input type="text" v-model="tagToAdd  " placeholder="Add tags" />
          <button @click="addTag">+</button>
          <div class="flex space-between" v-for="(tag,idx) in loadedQuiz.tags" :key="idx">
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
    <div v-for="(quest,questIdx) in loadedQuiz.quests" :key="questIdx">
      <h4>Question {{questIdx+1}}</h4>
      <hr />
      <input type="text" v-model="loadedQuiz.quests[questIdx].quests" />
      <span>
        <h5>Answers:</h5>
        <input
          v-model="loadedQuiz.quests[questIdx].opts[answerIdx]"
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
      <button @click="editQuiz(loadedQuiz)">Update Quiz</button>
    </div>
  </section>
</template>

<script>
import addQuiz from "@/styles/views/_add-quiz.scss"; //need to edit for its own scss
import quizService from "@/service/quizService.js";
import utilService from "@/service/utilService.js";

export default {
  name: "home",
  components: {},
  computed: {},
  data() {
    return {
      tagToAdd: "",
      loadedQuiz: {}
    };
  },

  async created() {
    const quizId = this.$route.params.id;
    var quiz = await this.$store.dispatch({ type: "getQuiz", quizId });
    console.log("quiz in the base edit page", quiz);
    this.loadedQuiz = quiz;
    console.log("quiz in the loaded quiz edit page", this.loadedQuiz);
  },
  methods: {
    addQuest() {
      var quest = { question: "", answers: ["", "", "", ""] };
      this.loadedQuiz.questions.push(quest);
    },
    deleteQuest(questIdx) {
      this.loadedQuiz.questions.splice(questIdx, 1);
    },
    setCurrectAnswer(questIdx, ev) {
      var value = ev.target.value;
      this.loadedQuiz.questions[questIdx].currectAnswer = value;
    },
    editQuiz(loadedQuiz) {
      this.$store.dispatch({ type: "editQuiz", loadedQuiz });
      this.$router.push("/");
    },
    addTag() {
      this.loadedQuiz.tags.push(this.tagToAdd);
      this.tagToAdd = "";
    },
    removeTag(idx) {
      this.loadedQuiz.tags.splice(idx, 1);
    }
  }
};
</script>

<style scoped>
</style>