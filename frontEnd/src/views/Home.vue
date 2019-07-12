<template>
  <div class="home">
    <app-header></app-header>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld";
import appHeader from '@/components/appHeader';

export default {
  name: "home",
  components: {
    appHeader
  }
};
</script>
