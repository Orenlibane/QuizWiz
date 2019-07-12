<template>
    <navbar class="nav-bar">
        <router-link to="/login">Login</router-link>
        <router-link  to="/signup">Sign Up</router-link>
    </navbar>
</template>

<script>
import navBar from "@/styles/components/_nav-bar.scss";
export default {
    name: 'navBar'
}
</script>