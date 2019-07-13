<template>
  <section class="quiz-filter flex both-align-center">
    <input type="text" v-model="filterBy.name" @input="setFilter" placeholder="🔍Search Quiz" />
    <div class="filters">
      <select v-model="filterBy.tags" @change="setFilter">
        <option value="All">All</option>
        <option value="1">1</option>
        <option value="2">2k</option>
        <option value="3">3k</option>
      </select>
    </div>
    <div class="filters">
      <select v-model="filterBy.sortBy" @change="setFilter">
        <option value="time">CreatedAt</option>
        <option value="likes">Likes</option>
      </select>
    </div>
  </section>
</template>

<script>
import global from "@/styles/global.scss";
export default {
  name: "QuizFilter",
  components: {},
  data() {
    return {
      filterBy: {
        name: "",
        tags: "All",
        createdAt: "",
        SortBy: ""
      }
    };
  },
  computed: {},
  methods: {
    setFilter() {
      this.$store.commit("setFilter", this.filterBy);
    }
  },
  components: {}
};
</script>

<style scoped>
</style>

