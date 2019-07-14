<template>
  <div class="quiz-gameboard">
    <H1>GAME BOARD</H1>
    <h1>question Number: {{info.currentQuestion +1}}</h1>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object
    }
  },
};
</script>