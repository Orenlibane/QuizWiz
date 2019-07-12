<template>
  <div class="card">
    <div class="flex space-around">
      <p>{{quiz.title}}</p>
      <p>{{quiz.likesCount}}</p>
    </div>
    <div class="flex space-around">
      <!-- <p>{{quiz.tags}}</p> -->
      <p>{{quiz.createdAt}}</p>
    </div>
    <div class="flex justify-center">
      <button>join</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["quiz"]
};
</script>
<style>
</style>
