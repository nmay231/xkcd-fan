<template>
    <div class="row mt-5">
        <div v-for="fav in favorites" v-bind:key="fav.num" class="col-lg-4 col-md-6 col-12 mb-3">
            <h4>{{fav.title}}</h4>
            <comic-image :backgroundUrl="fav.img" hover />
        </div>
    </div>
</template>

<script>
/** @format */

import Vue from 'vue'

import { fetchComic } from '../utils/fetchComic'
import ComicImage from '../components/ComicImage'

export default Vue.extend({
    data() {
        return {
            favorites: [],
        }
    },
    async created() {
        this.favorites = await Promise.all(
            this.$store.state.favorites.map((favId) => {
                return fetchComic(favId)
            }),
        )
    },
    components: {
        ComicImage,
    },
})
</script>

<style>
/** @format */
</style>