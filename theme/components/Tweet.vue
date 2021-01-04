<template>
    <div class="tweet">
        <Tweet :id="id">
    <div/>
</template>

<script>
import { Tweet } from 'vue-tweet-embed'
export default {
    props: {
        id: {
            required: true
        }
    },
    components: {
        Tweet
    }
};
</script>

<style scoped>
.tweet {
    padding: 5px 0 10px 0;
}
</style>