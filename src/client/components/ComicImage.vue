<template>
    <div
        v-if="!expanded"
        class="comic-image-small"
        :title="hover"
        :style="{backgroundImage: `url(${backgroundUrl})`}"
    ></div>
    <div v-else>
        <img :src="backgroundUrl" :title="hover" class="comic-image-expanded" />
    </div>
</template>

<script>
/** @format */

import Vue from 'vue'

export default Vue.extend({
    name: 'comic-image',
    props: { backgroundUrl: String, hover: String, expanded: Boolean },
})
</script>

<style scoped>
/** @format */
.comic-image-small {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: cover;
    height: 20rem;
    min-width: 20rem;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 1px;
    margin: 3px;
}

.comic-image-expanded {
    background-size: contain;
}
</style>