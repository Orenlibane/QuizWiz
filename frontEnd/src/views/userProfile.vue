<template>
  <section class="user-profile">
      {{user}}
  <input type="file" @change="onFileSelected">
  <button @click="upload">Upload</button>
  </section>
</template>

<script>
export default {
  created() {
    this.user = this.$store.getters.getUser
  },

  data() {
      return{
          user: Object,
          selectedFile: null
      }
  },
  methods: {
    onFileSelected(event) {
      console.log(event);
      this.selectedFile = event.target.files[0]
    }
  }
};
</script>