<template>
  <section class="add-quiz">
    <h1>Create a new quiz</h1>
    <div class="top-options flex column">
      <h2>
        <input type="text" placeholder="Quiz Title" v-model="newQuiz.name" />
      </h2>
      <div class="flex">
        <div class="img-container">
          <h5>Add tags</h5>
          <input type="text" v-model="tagToAdd" placeholder="Add tags" />
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
    <div v-for="(quest,questIdx) in newQuiz.quests" :key="questIdx">
      <h4>Question {{questIdx+1}}</h4>
      <hr />
      <input type="text" v-model="newQuiz.quests[questIdx].txt" />
      <span>
        <h5>Answers:</h5>
        <input
          v-model="newQuiz.quests[questIdx].opts[idx]"
          v-for="(n,idx) in 4"
          :key="idx"
          type="text"
        />

        <button @click="deleteQuest(questIdx)">🗑️</button>
      </span>
      <h5>Currect Answer</h5>
      <select @change="setCurrectAnswer(questIdx, $event)">
        <option>Answer</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>
    <div class="flex add-btns">
      <button @click="addQuest">Add question</button>
      <button @click="addQuiz()">Submit Quiz</button>
    </div>
  </section>
</template>

<script>
import addQuiz from "@/styles/views/_add-quiz.scss";
import quizService from "@/service/quizService.js";
import utilService from "@/service/utilService.js";

export default {
  name: "addQuiz",
  components: {},
  computed: {},
  data() {
    return {
      tagToAdd: "",
      newQuiz: {
        name: "",
        creatorName: "Username",
        tags: [],
        createdAt: null,
        bestScore: 0,
        likesCount: 0,
        quests: [
          {
            txt: "",
            opts: []
          }
        ]
      }
    };
  },
  methods: {
    addQuest() {
      var quest = { txt: "", opts: ["", "", "", ""] };
      this.newQuiz.quests.push(quest);
    },
    deleteQuest(questIdx) {
      this.newQuiz.quests.splice(questIdx, 1);
    },
    setCurrectAnswer(questIdx, ev) {
      var value = ev.target.value;
      this.newQuiz.quests[questIdx].correctOptIdx = parseInt(value - 1);
    },
    addQuiz() {
      console.log(this.newQuiz);
      if (
        this.newQuiz.quests.length === 0 ||
        this.newQuiz.quests.length === 1
      ) {
        console.log("cant add quiz with less then 2 questions");
        return;
      }
      var addedQuiz = this.newQuiz;
      this.$store.dispatch({ type: "addQuiz", addedQuiz });
      this.$router.push("/");
    },
    addTag() {
      if (this.tagToAdd === "") return;
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