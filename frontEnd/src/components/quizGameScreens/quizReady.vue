<template>
  <section>
    <h1>GET SET</h1>
    <h1>3</h1>
    <h1>2</h1>
    <h1>1</h1>
  </section>
</template>

<script>
export default {
  created() {
    this.timeOut = setTimeout(() => {
      this.$emit("gameStage", "quizQueast");
    }, 3000);
  },
  destroyed() {
    clearTimeout(this.timeOut);
  },
  data() {
    return {
      timeOut: null
    };
  }
};
</script>
