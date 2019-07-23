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
  props: {
    users: {
      type: Array
    }
  },
  created() {
    for (let i = 0; i < this.users.length; i++) {
      this.users[i].idx = i;
      console.log("idx is:", i);
    }
  }
};
</script>
