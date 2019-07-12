<template>
  <section class="home-page">
    <nav>Nav here</nav>
    <div class="quizes-show">
      <h4>here is the ongoing quizes</h4>
      <div class="cards">
        <div v-for="(n,idx) in 8" :key="idx" class="card">quiz {{idx+1}}</div>
      </div>
    </div>
    <router-link to="/quiz/add">
      <button>Add quiz</button>
    </router-link>
    <div class="quizes-show">
      <h4>here is the recomendd quizes</h4>
      <div class="cards">
        <div v-for="(n,idx) in 8" :key="idx" class="card">quiz {{idx+1}}</div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import homePage from "@/styles/views/_home-page.scss";
export default {
  name: "home",
};
</script>

<style lang="scss" scoped>
</style>