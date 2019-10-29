/** @format */

import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './MainPage'
import SingleComicPage from './SingleComicPage'

Vue.use(Router)

export default new Router({
    mode: 'hash',
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
            path: '/single/:comicId',
            name: 'SimgleComic',
            component: SingleComicPage,
            props: true,
        },
    ],
})
