/** @format */

import Vue from 'vue'
import Router from 'vue-router'

import MainPage from './MainPage'
import SingleComicPage from './SingleComicPage'
import AboutPage from './AboutPage'
import FavoritesPage from './FavoritesPage'

Vue.use(Router)

export default new Router({
    mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash',
    routes: [
        {
            path: '/',
            redirect: { name: 'MainPage' },
        },
        {
            path: '/home',
            name: 'MainPage',
            component: MainPage,
        },
        {
            path: '/single/:comicId?',
            name: 'SimgleComic',
            component: SingleComicPage,
            props: true,
        },
        {
            path: '/about',
            name: 'AboutPage',
            component: AboutPage,
        },
        {
            path: '/favorites',
            name: FavoritesPage,
            component: FavoritesPage,
        },
    ],
})
