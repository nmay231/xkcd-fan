<!-- @format -->

<template>
    <div id="MainPage">
        <h4 class="my-3">
            <i>Randall's latest and greatest</i>
        </h4>
        <comic-image
            v-if="latestComic.img"
            class="mb-3"
            :backgroundUrl="latestComic.img"
            :comicName="latestComic.title"
            :hover="latestComic.alt"
            expanded
        />
        <b-button
            class="btn btn-secondary mt-4 mb-5"
            @click="goToRandomComic"
        >See more of his creations</b-button>
    </div>
</template>

<script>
/** @format */

import ComicImage from '@c/components/ComicImage'

export default {
    name: 'MainPageComponent',
    computed: {
        latestComic: function() {
            return this.$store.state.latestComic
        },
    },
    methods: {
        goToRandomComic() {
            this.$router.push(`/single/${Math.floor(Math.random() * this.latestComic.num) + 1}`)
        },
    },
    components: {
        ComicImage,
    },
}
</script>

<style scoped>
/** @format */
</style>
