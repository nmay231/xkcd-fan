<template>
    <div class="row my-5 justify-content-center">
        <div
            v-for="fav in favorites"
            v-bind:key="fav.num"
            :class="{'col-xl-3 col-lg-4 col-md-6 col-12 mb-3 align-self-end': true, destroyed: fav._destroyed}"
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
        <div v-if="!(didInit && fullyLoaded)" class="col-12">
            <div class="spinner-border mt-5 mx-auto"></div>
        </div>
        <infinite-loading v-if="didInit" @infinite="scroll" class="col-12">
            <span slot="no-more"></span>
            <div slot="spinner"></div>
            <div slot="no-results">
                <h2 class="mx-auto mt-5 mb-3">No favorites found</h2>
                <p
                    class="mx-auto col-md-6"
                >It looks like you don't have any favorites marked on this device. Go and add some you like!</p>
            </div>
        </infinite-loading>
    </div>
</template>

<script>
/** @format */

import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'
import clipboard from 'clipboard-polyfill'

import { fetchComic } from '../utils/fetchComic'
import ComicImage from '../components/ComicImage'

export default Vue.extend({
    data() {
        return {
            favorites: [],
            page: 0,
            pageLength: 3,
        }
    },
    computed: {
        favoriteIds() {
            return [...this.$store.state.favorites].reverse()
        },
        didInit() {
            return this.$store.state.didInit
        },
        fullyLoaded() {
            return this.favoriteIds.length <= (this.page + 1) * this.pageLength
        },
    },
    methods: {
        goToComic(comicId) {
            this.$router.push(`/single/${comicId}`)
        },
        removeFav(comicId) {
            this.$store.dispatch('removeFromFavorites', comicId)
            const index = this.favorites.findIndex((fav) => fav.num === comicId)
            this.favorites = this.favorites.map((fav, i) =>
                i === index ? { ...fav, _destroyed: true } : fav,
            )
            setTimeout(() => this.favorites.splice(index, 1), 500)
        },
        copyToClipboard(comicId) {
            clipboard.writeText(`https://xkcd.com/${comicId}`)
        },
        scroll($state) {
            const nextComics = this.favoriteIds.slice(
                this.page * this.pageLength,
                (this.page + 1) * this.pageLength,
            )
            if (nextComics.length === 0) {
                return $state.complete()
            }

            Promise.all(
                nextComics.map((favId) => {
                    return fetchComic(favId)
                }),
            ).then((nextComics) => {
                this.favorites.push(...nextComics)
                this.page += 1
                $state.loaded()
            })
        },
    },
    components: { ComicImage, InfiniteLoading },
})
</script>

<style scoped>
/** @format */

.pointer {
    cursor: pointer;
}

.destroyed {
    animation: removed 500ms linear;
    opacity: 0;
}

@keyframes removed {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>