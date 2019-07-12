<template>
  <section class="quiz-game">
      <h1 class="curr-quest">{{quest}}</h1>
    <div class="answers" v-for="(answer, idx) in answers" :key="idx">
            <button class="answer">{{answer}}</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      quest:
        `Who is the creator of the comic series "The Walking Dead" ? `,
      correct_answer: 2,
      answers: ["1973", "Stan Lee", "Malcolm Wheeler-Nicholson", "Robert Crumb"]
    };
  }
};
</script>

<style lang="scss">
    .curr-quest {
        text-align: center;
    }
    .answers {
        display: flex;
        flex-wrap: wrap;
        background: grey;
    }
    .answer {
                font-size: 2rem;
                flex-basis: 50%;
    }
</style>