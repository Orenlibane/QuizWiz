<template>
  <section class="home-page">
    <app-header></app-header>
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
    <footer>footer here</footer>
  </section>
</template>

<script>
// @ is an alias to /src
<<<<<<< HEAD
import HelloWorld from "@/components/HelloWorld.vue";
import appHeader from "@/components/appHeader";

export default {
  name: "home",
  components: {
    appHeader,
    HelloWorld
  }
};
</script>

<style lang:"scss" scoped>
section {
  height: 80vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
button {
  padding: 20px;
  margin: 10px 0;
}

.quizes-show {
  border: 2px black solid;
  padding: 10px;
  width: 80vw;
}

.cards {
  text-align: center;
  display: flex;
}

.card {
  border: 1px black solid;
  padding: 70px 50px;
  margin: 0 5px;
}
=======
import homePage from "@/styles/views/_home-page.scss";

export default {
  name: "home",
  components: {}
};
</script>

<style lang="scss" scoped>
>>>>>>> 63a93ed4e6316e83ef815ecfbb78fa50176bd453
</style>