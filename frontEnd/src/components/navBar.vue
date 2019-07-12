<template>
    <nav class="nav-bar">
        <router-link to="/login">Login</router-link>
        <router-link  to="/signup">Sign Up</router-link>
    </nav>
</template>

<script>
import navBar from "@/styles/components/_nav-bar.scss";
export default {
    name: 'navbar'
}
</script>