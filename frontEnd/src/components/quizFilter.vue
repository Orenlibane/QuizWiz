<template>
  <section class="quiz-filter flex both-align-center">
    <input type="text" v-model="filterBy.txt" @input="emitSetFilter" placeholder="🔍Search Quiz" />
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
        txt: ""
      }
    };
  },
  computed: {},
  methods: {
    emitSetFilter() {
      this.$emit("emitSetFilter", this.filterBy);
    }
  },
  components: {}
};
</script>



