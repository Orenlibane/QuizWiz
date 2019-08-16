<template>
  <div class="quiz-library layout-container">
    <h1 class="white-headline">Quiz Library</h1>
    <quiz-filter @emitSetFilter="setFilter"></quiz-filter>
    <quiz-list class="add-margin-bottom" v-if="filterQuizes" :quizes="filterQuizes"></quiz-list>
  </div>
</template>

<script>
import global from "@/styles/global.scss";
import quizList from "../components/quizList";
import quizFilter from "@/components/quizFilter";

export default {
  props: [],
  components: { quizList, quizFilter },
  computed: {
    filterQuizes() {
      return this.$store.getters.getFilterQuizes;
    }
  },
  methods: {
    setFilter(filterBy) {
      this.$store.dispatch({ type: "setFilter", filterBy: filterBy });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
