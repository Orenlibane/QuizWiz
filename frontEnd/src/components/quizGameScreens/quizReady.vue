<template>
  <section class="countDown container flex column both-align-center">
    <h1 v-if="showMsg" class="center">GAME STARTED</h1>
    <div v-if="timerShow" class="flex column both-align-center">
      <h1>GET SET</h1>
      <h1>{{timer}}</h1>
    </div>
  </section>
  <!-- TODO: delete if not using -->
</template>

<script>
import global from "@/styles/global.scss";

export default {
  created() {
    this.timeOut = setTimeout(() => {
      this.$emit("gameStage", { cmp: "quizQuest" });
    }, 4000);
    setTimeout(() => {
      this.showMsg = true;
      this.timerShow = false;
    }, 3000);
    this.countDown = setInterval(() => {
      this.timer--;
    }, 1000);
  },
  destroyed() {
    clearInterval(this.countDown);
    clearTimeout(this.timeOut);
  },
  data() {
    return {
      timeOut: null,
      countDown: null,
      timer: 3,
      timerShow: true,
      showMsg: false
    };
  }
};
</script>


<style scoped>
.countDown {
  font-size: 4rem;
}
</style>

