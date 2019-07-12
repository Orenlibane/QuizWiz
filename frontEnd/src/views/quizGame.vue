<template>
  <section>
    <component :is="this.cmp.type" :info="this.cmpinfo" @inform="this.cmp.imform" />
  </section>
</template>

<script>
export default {
  data() {
    return {
      cmp: {
        type: "",
        info: "",
        inform:"func"
      },
      cmpArr:[
        'detailsScreen',
        'LobbyScreen',
        'questScreen',
        'endScreen',
        'readyScreen',
        'resultScreen'
      ]
    };
  },
  methods:{
  }
};
</script>

<style lang="scss">
</style>