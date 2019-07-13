<template>
  <div class="quiz-gameboard">
    <H1>GAME BOARD</H1>
    <h1>question Number: {{info.currentQuestion +1}}</h1>
    <quest-timer></quest-timer>
  </div>
</template>

<script>
import questTimer from './questTimer';
export default {
  props: {
    info: {
      type: Object
    }
  },
  components: {
      questTimer
  }
  
};
</script>