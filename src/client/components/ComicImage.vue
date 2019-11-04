<template>
    <div v-if="expanded">
        <h3 class="mb-3">{{comicName}}</h3>
        <img :src="backgroundUrl" :title="hover" class="comic-image-expanded" />
    </div>
    <div v-else>
        <h4 class="mb-2">{{comicName}}</h4>
        <div
            class="comic-image-small"
            :title="hover"
            :style="{backgroundImage: `url(${backgroundUrl})`}"
        ></div>
    </div>
</template>

<script>
/** @format */

import Vue from 'vue'

export default Vue.extend({
    name: 'comic-image',
    props: {
        backgroundUrl: { type: String, required: true },
        comicName: { type: String, required: true },
        hover: String,
        expanded: Boolean,
    },
})
</script>

<style scoped>
/** @format */
.comic-image-small {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: cover;
    height: 15rem;
    min-width: 15rem;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 1px;
    margin: 3px;
}

.comic-image-expanded {
    max-width: 100%;
}
</style>