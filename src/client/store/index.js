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
        didInit: false,
        softAlert: { content: null, timeoutId: null },
    },
    mutations: {
        setFavorites(state, favorites) {
            state.favorites = favorites
            localStorage.setItem('favoriteComics', JSON.stringify(state.favorites))
        },
        setLatestComic(state, latest) {
            state.latestComic = latest
        },
        didInit(state) {
            state.didInit = true
        },
        updateSoftAlert(state, softAlert) {
            Object.assign(state.softAlert, softAlert)
        },
    },
    actions: {
        async init(store) {
            store.commit('setLatestComic', await fetchComic())
            const favs = localStorage.getItem('favoriteComics')
            if (favs) store.commit('setFavorites', JSON.parse(favs))
            store.commit('didInit')
        },
        addToFavorites(store, fav) {
            store.commit('setFavorites', [...store.state.favorites, fav])
        },
        removeFromFavorites(store, fav) {
            store.commit('setFavorites', store.state.favorites.filter((val) => val !== fav))
        },
        makeSoftAlert(store, { content, durationMs = 3000 }) {
            clearTimeout(store.state.softAlert.timeoutId)
            const timeoutId = setTimeout(
                () => store.commit('updateSoftAlert', { content: null }),
                durationMs,
            )
            store.commit('updateSoftAlert', { content, timeoutId })
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
