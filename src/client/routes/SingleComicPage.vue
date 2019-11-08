<template>
    <div>
        <div class="col-lg-12">
            <b-button-group class="mt-5">
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
            <comic-image
                v-if="comic.img"
                :backgroundUrl="comic.img"
                :hover="comic.alt"
                :comicName="comic.title"
                class="mt-3 mb-5"
                expanded
            />
            <b-button
                class="mb-5"
                @click="toggleFavorite"
            >{{this.favorited ? 'Remove from' : 'Add to'}} favorites</b-button>
            <p class="d-md-none text-muted mb-5 col-md-10 mx-auto">
                Hidden text:
                <i>{{comic.alt}}</i>
            </p>
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
            async handler() {
                if (this.comicId) {
                    this.comic = await fetchComic(this.comicId)
                } else {
                    this.comic = this.$store.state.latestComic
                    this.$router.replace(`/single/${this.comic.num}`)
                }
                this.loaded = true
            },
        },
    },
    methods: {
        toggleFavorite() {
            if (this.favorited) {
                this.$store.dispatch('removeFromFavorites', this.comic.num)
                this.softAlert('Removed from favorites', 2000)
            } else {
                this.$store.dispatch('addToFavorites', this.comic.num)
                this.softAlert('Added to favorites', 2000)
            }
        },
        softAlert(content, durationMs) {
            this.$store.dispatch('makeSoftAlert', { content, durationMs })
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