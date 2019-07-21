<template>
  <section class="add-quiz flex column both-align-center">
    <div class="inner-container">
      <!-- Header & Subheader -->
      <div class="header">
        <h1 class="fs30">Add A New Quiz</h1>
      </div>
      <!-- Add Form -->
      <form @click.prevent>
        <!--Quiz Name -->
        <div>
          <label for="title">Quiz Name:</label>
          <input type="text" placeholder="Choose A Name" v-model="newQuiz.name" />
        </div>
        <!-- Quiz Creator -->
        <div>
          <label for="creator">Created By:</label>
          <input type="text" v-model="newQuiz.creatorName" placeholder="Your name" />
        </div>

        <!-- Quiz Tags -->
        <div>
          <label for="tags">Tags:</label>
          <input type="text" v-model="tagToAdd" placeholder="Add a tag..." />
          <button class="add-tag-btn" @click="addTag">
            <i class="fas fa-plus"></i>
          </button>
          <div class="tag-item" v-for="(tag,idx) in newQuiz.tags" :key="idx">
            {{tag}}
            <button class="remove-tag-btn" @click="removeTag(idx)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <!-- Quiz Image -->
        <div class="add-img">
          <label for="image">Image URL:</label>
          <input type="text" v-model="newQuiz.imgUrl" placeholder="Image url..." />
        </div>
        <!-- Quiz Questions -->

        <hr />
        <label class="quests-header" for="questions">Questions:</label>
        <hr />

        <div class="quest-container" v-for="(quest,questIdx) in newQuiz.quests" :key="questIdx">
          <label for="question">Question {{questIdx+1}}</label>
          <input
            class="quest-input"
            type="text"
            placeholder="Write a question..."
            v-model="newQuiz.quests[questIdx].txt"
          />
          <button class="delete-quest-btn" @click="deleteQuest(questIdx)">
            <i class="fas fa-trash"></i>
          </button>

          <label for="options">Options</label>
          <input
            class="opt-input"
            v-model="newQuiz.quests[questIdx].opts[idx]"
            v-for="(n,idx) in 4"
            :key="idx"
            type="text"
            :placeholder="`Option ${idx+1}`"
          />
          <div class="corr-ans">
            <label for="correct">Correct Answer:</label>
            <select @change="setCorrectAns(questIdx, $event)">
              <option>Answer</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>

        <div class="flex both-align-center">
          <button class="add-quest-btn" @click="addQuest">
            New Question
            <i class="fas fa-plus"></i>
          </button>
        </div>

        <button class="submit-quiz-btn" @click="addQuiz()">
          Submit Quiz
          <i class="fas fa-paper-plane"></i>
        </button>
      </form>
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
        creatorName: "",
        imgUrl: "",
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
    setCorrectAns(questIdx, ev) {
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