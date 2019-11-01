/** @format */

import Vue from 'vue'
import Vuex from 'vuex'

import { fetchComic } from '@c/utils/fetchComic'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        latestComic: {},
        favorites: [],
    },
    mutations: {
        setFavorites(state, favorites) {
            state.favorites = favorites
            localStorage.setItem('favoriteComics', JSON.stringify(state.favorites))
        },
        setLatestComic(state, latest) {
            state.latestComic = latest
        },
    },
    actions: {
        async init(store) {
            store.commit('setLatestComic', await fetchComic())
            const favs = localStorage.getItem('favoriteComics')
            if (favs) store.commit('setFavorites', JSON.parse(favs))
        },
        addToFavorites(store, fav) {
            store.commit('setFavorites', [...store.state.favorites, fav])
        },
        removeFromFavorites(store, fav) {
            store.commit('setFavorites', store.state.favorites.filter((val) => val !== fav))
        },
    },
    getters: {
        isInFavorites: (state) => (comicId) => {
            return state.favorites.indexOf(comicId) > -1
        },
    },
})

store.dispatch('init')

export default store
