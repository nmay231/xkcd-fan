<template>
    <div v-if="loaded && favorites.length" class="row mt-5">
        <div
            v-for="fav in favorites"
            v-bind:key="fav.num"
            class="col-xl-3 col-lg-4 col-md-6 col-12 mb-3 align-self-end"
        >
            <div @click="goToComic(fav.num)">
                <comic-image
                    :backgroundUrl="fav.img"
                    :comicName="fav.title"
                    :hover="fav.alt"
                    class="pointer"
                />
            </div>
            <div class="d-flex justify-content-center">
                <font-awesome-icon
                    icon="trash"
                    class="mx-2 pointer"
                    @click="removeFav(fav.num)"
                    title="Remove from favorites"
                />
                <font-awesome-icon
                    icon="link"
                    class="mx-2 pointer"
                    @click="copyToClipboard(fav.num)"
                    title="Copy original link"
                />
            </div>
        </div>
    </div>
    <div v-else-if="loaded">
        <h2 class="mx-auto mt-5 mb-3">No favorites found</h2>
        <p
            class="mx-auto col-md-6"
        >It looks like you don't have any favorites marked on this device. Go and find some you like!</p>
    </div>
    <div v-else>
        <div class="spinner-border mt-5"></div>
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
            loaded: false,
            favorites: [],
        }
    },
    computed: {
        favoriteIds() {
            return [...this.$store.state.favorites].reverse()
        },
    },
    watch: {
        favoriteIds: {
            async handler() {
                this.favorites = await Promise.all(
                    this.favoriteIds.map((favId) => {
                        return fetchComic(favId)
                    }),
                )
                this.loaded = true
            },
            immediate: true,
        },
    },
    methods: {
        goToComic(comicId) {
            this.$router.push(`/single/${comicId}`)
        },
        removeFav(comicId) {
            this.$store.dispatch('removeFromFavorites', comicId)
        },
        copyToClipboard(comicId) {
            navigator.clipboard.writeText(`https://xkcd.com/${comicId}`)
        },
    },
    components: {
        ComicImage,
    },
})
</script>

<style scoped>
/** @format */

.pointer {
    cursor: pointer;
}
</style>