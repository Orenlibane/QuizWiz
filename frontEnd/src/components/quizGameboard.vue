<template>
  <div class="quiz-gameboard">
    <h1>GAME BOARD</h1>
    <h1>question Number: {{info.currentQuestion +1}}</h1>
  </div>
</template>

<script>
import global from "@/styles/global.scss";
export default {
  props: {
    info: {
      type: Object
    }
  }
};
</script>