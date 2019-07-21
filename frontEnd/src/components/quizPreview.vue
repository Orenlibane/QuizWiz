<template>
  <section class="quiz-preview-card">
    <!-- IMG RIGHT SIDE WITH BTNS -->
    <div class="quiz-preview-img-container" :style="{ backgroundImage: 'url(' + imgUrl + ')' }">
      <div class="quiz-preview-btn-container flex">
        <button class="quiz-preview-like-btn">
          <svg
            width="16px"
            height="14px"
            viewBox="0 0 16 14"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g id="Symbols">
              <g id="heart-empty " transform="translate(0.000000, -2.000000)">
                <path
                  d="M13.7290336,8.61715616 L8.00001319,14.3463865 L2.27086613,8.61715616 C1.07308561,7.41951829 1.07308561,5.47088664 2.27086613,4.27261541 C2.85105163,3.69250164 3.62271819,3.37341585 4.4430678,3.37341585 C5.26350186,3.37341585 6.0349573,3.69250164 6.61493168,4.27261541 L7.51449154,5.17249054 C7.77234707,5.42997171 8.22793266,5.42997171 8.48570374,5.17249054 L9.38496804,4.27261541 C9.96498464,3.69250164 10.7364823,3.37341585 11.5571697,3.37341585 C12.3776038,3.37341585 13.149017,3.69250164 13.7290336,4.27261541 C14.9269408,5.47088664 14.9269408,7.41947606 13.7290336,8.61715616 M14.6999924,3.30159305 C13.8604314,2.4620136 12.7444367,2 11.5571275,2 C10.3696494,2 9.25348578,2.4620136 8.41362917,3.30159305 L7.99992875,3.71538698 L7.58627055,3.30159305 C6.7467095,2.4620136 5.63029259,2 4.4430678,2 C3.25588524,2 2.13938388,2.4620136 1.29990727,3.30159305 C-0.433302425,5.03500962 -0.433302425,7.85535308 1.29990727,9.58809407 L7.51048036,15.7988033 C7.61198432,15.9007739 7.73844205,15.9631808 7.87051542,15.9871639 C7.91480729,15.9959043 7.9593525,16 8.00398215,16 C8.17962961,16 8.35561484,15.9329907 8.48941936,15.7988033 L14.7000347,9.58809407 C16.4333288,7.85535308 16.4333288,5.03500962 14.6999924,3.30159305"
                  id="Fill-1"
                />
              </g>
            </g>
          </svg>
        </button>
        <span class="quiz-preview-like-count">{{quiz.likesCount}}</span>
      </div>
    </div>
    <!-- PREVIEW DETAILS LEFT SIDE -->
    <div class="quiz-preview-details">
      <p>by {{quiz.creatorName}}</p>
      <h2>{{quiz.name}}</h2>
      <div class="quiz-preview-timer flex space-between align-center">
        <p>{{quiz.tags[0]}} {{quiz.tags[1]}}</p>
        <span v-if="quiz.gameId">{{lobbyTime}}</span>
        <span v-else>30:00</span>
      </div>
      <div class="flex both-align-center">
        <button class="card-btn" @click="deleteQuiz(quiz._id)">🗑️</button>
        <button class="card-btn">
          <router-link :to="editUrl">Edit</router-link>
        </button>

        <button class="card-btn">
          <router-link v-if="!quiz.gameId" :to="enterGameUrl">Enter</router-link>
          <button v-if="quiz.gameId" @click="enterLiveGame">EnterLiveGame</button>
        </button>
      </div>
    </div>
  </section>
</template>

        

<script>
import quizService from "../service/quizService.js";
import _quizPreview from "../styles/components/_quiz-prev.scss";
import filters from "../filters.js";
import utilService from "../service/utilService.js";
const moment = require("moment");
const Swal = require("sweetalert2");

export default {
  props: {
    quiz: {
      type: Object
    }
  },
  data() {
    return {
      imgUrl:
        "https://images.unsplash.com/photo-1563454758691-702be3d2e2b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
    };
  },
  methods: {
    // THOSE OPTIONS ARE ONLY FOR TESTING!!! The user won't really be able to delete games.
    deleteQuiz(quizId) {
      this.$store.dispatch({ type: "deleteQuiz", quizId });
    },
    async enterLiveGame() {
      // let nickName = prompt("please enter your name:");
      let nickName = await Swal.fire({
        title: "Enter your Guest NickName",
        input: "text"
      });

      let infoToLog = {
        gameId: this.quiz.gameId,
        user: {
          userId: utilService.makeId(),
          nickName: nickName.value,
          ans: []
        }
      };
      this.$store.dispatch({ type: "changeGameStage", stage: "quizLobby" });
      this.$store.dispatch({ type: "setUser", infoToLog: infoToLog.user });
      this.$store.dispatch({ type: "logToLiveGame", infoToLog });
      this.$router.push(`/quiz/${this.quiz._id}/game`);
    }
    // toggleLike() {
    //   console.log("give like to", this.quiz._id);
    //   this.$store.dispatch({type: "likeQuiz", quizId: this.quiz._id})
    // }
  },
  computed: {
    enterGameUrl() {
      return `quiz/${this.quiz._id}/game`;
    },
    editUrl() {
      return `quiz/edit/${this.quiz._id}`;
    },
    serverTime() {
      let time = moment(this.$store.getters.serverTime).format("mm:ss");
      return time;
    }
    // lobbyTime() {
    //   console.log("lobby timer:", this.$store.state.getters.getLobbyTimer);
    //   return this.$store.state.getters.getLobbyTimer;
    // }
  },
  created() {}
};
</script>



  