<!-- @format -->

<template>
    <div id="app" class="mt-0">
        <b-navbar toggleable="lg" type="dark" variant="secondary">
            <b-navbar-brand href="/">XKCD Fan</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse" />
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-link class="nav-link" to="/about">About</b-link>
                    <b-link class="nav-link" to="/single">Latest Comic</b-link>
                    <b-link class="nav-link" to="/favorites">Your Favorites</b-link>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <div class="container">
            <router-view />
        </div>
    </div>
</template>

<script>
/** @format */

import Vue from 'vue'

export default Vue.extend({
    name: 'App',
})
</script>

<style>
/** @format */

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
