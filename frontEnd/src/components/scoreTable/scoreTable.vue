<template>
  <div class="score-table flex justify-center column">
    <score-item v-for="(user,idx) in users" :key="idx" :user="user" :id="idx"></score-item>
  </div>
</template>
<script>
import scoreItem from "./scoreItem.vue";
export default {
  components: {
    scoreItem
  },
  props:['users']
};
</script>
