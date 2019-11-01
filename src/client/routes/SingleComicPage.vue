<template>
    <div>
        <div class="col-lg-11">
            <b-button-group class="mt-4">
                <b-link
                    :disabled="1 >= parseInt(comicId)"
                    :to="`/single/${parseInt(comic.num) - 1}`"
                    class="btn btn-secondary shadow-none"
                >Previous comic</b-link>
                <b-link
                    :to="`/single/${Math.floor(Math.random() * latestComicId) + 1}`"
                    class="btn btn-secondary shadow-none"
                >Go to random comic</b-link>
                <b-link
                    :disabled="parseInt(comic.num) >= latestComicId"
                    :to="`/single/${parseInt(comic.num) + 1}`"
                    class="btn btn-secondary shadow-none"
                >Next comic</b-link>
            </b-button-group>
            <h3 class="my-3">{{comic.title}}</h3>
            <comic-image :backgroundUrl="comic.img" :hover="comic.alt" class="mb-5" expanded />
            <b-button
                class="mb-5"
                @click="toggleFavorite"
            >{{this.favorited ? 'Remove from' : 'Add to'}} favorites</b-button>
            <div v-for="fav in $store.state.favorites" v-bind:key="fav">{{fav}}</div>
        </div>
    </div>
</template>

<script>
/** @format */

import ComicImage from '../components/ComicImage'

import { fetchComic } from '@c/utils/fetchComic'

export default {
    name: 'SingleComicPageComponent',
    props: {
        comicId: String,
    },
    data: () => ({
        comic: {},
        latestComicId: null,
    }),
    async created() {
        if (!parseInt(this.latestComicId)) {
            this.latestComicId = this.$store.state.latestComic.num
        }
    },
    watch: {
        comicId: {
            immediate: true,
            handler: 'LoadComic',
        },
    },
    methods: {
        async LoadComic() {
            if (this.comicId) {
                this.comic = await fetchComic(this.comicId)
            } else {
                this.comic = this.$store.state.latestComic
                this.$router.replace(`/single/${this.comic.num}`)
            }
            this.loaded = true
        },
        toggleFavorite() {
            if (this.favorited) {
                this.$store.dispatch('removeFromFavorites', this.comic.num)
            } else {
                this.$store.dispatch('addToFavorites', this.comic.num)
            }
        },
    },
    computed: {
        favorited() {
            return this.$store.getters.isInFavorites(this.comic.num)
        },
    },
    components: {
        ComicImage,
    },
}
</script>

<style scoped>
/** @format */
.no-style {
    text-decoration: none;
    color: white;
}
</style>