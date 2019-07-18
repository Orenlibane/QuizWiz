<template>
  <section v-if="user" class="user-profile">
    {{user}}
    <div>
      E-mail: {{user.email}}
      <span class="edit">Edit</span>
    </div>
  </section>
</template>

<script>
export default {
  async created() {
    this.user = await this.$store.getters.getUser;
    console.log('user:', this.$store.getters);
  },

  data() {
    return {
      user: Object,
      selectedFile: null
    };
  },
  methods: {}
};
</script>