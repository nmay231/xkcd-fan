<!-- @format -->

<template>
    <div id="app" class="mt-0">
        <b-navbar toggleable="md" type="dark" variant="secondary">
            <b-navbar-brand href="/">XKCD Fan</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse" />
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto mr-5">
                    <b-link class="nav-link mx-3" to="/about">About</b-link>
                    <b-link class="nav-link mx-3" to="/single">Latest Comic</b-link>
                    <b-link class="nav-link mx-3" to="/favorites">Your Favorites</b-link>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <!-- Add alerts here! -->
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
