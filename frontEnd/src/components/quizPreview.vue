<template>
    <div>
        <p>{{quiz.title}}</p>
        <p>{{quiz.tags}}</p>
        <p>{{quiz.createdAt}}</p>
        <p>{{quiz.likesCount}}</p>
        <button>join</button>
    </div>
</template>

<script>
export default {
    props:['quiz']
}
</script>
<style>

</style>
