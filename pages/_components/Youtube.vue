<template>
<div class="container">
    <iframe :src="src" 
                    class="video" 
                    @onload="isLoaded"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
    </iframe>
    <div v-if="notLoaded">正在尝试载入Youtube嵌入...</div>
</div>
</template>

<script>
export default {
    props: {
        id: {
            required: true,
            type: String
        }
    },
    data() {
        return {
            notLoaded: true
        }
    },
    computed: {
        src() {
            return `https://www.youtube-nocookie.com/embed/${this.id}`
        }
    },
    methods: {
        isLoaded(){
            notLoaded = false
        }
    }
}
</script>

<style scoped>
.container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
}
.video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>