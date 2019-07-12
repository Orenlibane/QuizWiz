<template>
  <section class="home">
    <nav>Nav here</nav>
    <div class="quizes-show">
      <h4>here is the ongoing quizes</h4>
      <div class="cards">
        <div v-for="(n,idx) in 8" :key="idx" class="card">quiz {{idx+1}}</div>
      </div>
    </div>
    <button to="/quiz/edit">Add quiz</button>
    <div class="quizes-show">
      <h4>here is the recomendd quizes</h4>
      <div class="cards">
        <div v-for="(n,idx) in 8" :key="idx" class="card">quiz {{idx+1}}</div>
      </div>
    </div>
    <footer>footer here</footer>
  </section>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>

<style scoped>
section {
  height: 80vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>