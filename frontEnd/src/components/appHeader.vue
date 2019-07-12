<template>
  <header class="appHeader">
      <app-logo></app-logo>
      <log-in> </log-in>
  </header>
</template>

<script>
import appLogo from '@/components/appLogo';
import logIn from '@/components/logIn';
export default {
    
    components: {
        appLogo,
        logIn
    }
}
</script>

<style scoped>
</style>