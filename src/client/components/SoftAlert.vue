<template>
    <div id="soft-alert" class="col mx-auto d-flex justify-content-center">
        <b-alert :show="Boolean(content)" variant="secondary" :class="{fade}">{{content}}</b-alert>
    </div>
</template>

<script>
/** @format */

import Vue from 'vue'

export default Vue.extend({
    name: 'soft-alert',
    data() {
        return { content: null }
    },
    computed: {
        mainAlert() {
            return this.$store.state.softAlert
        },
        fade() {
            return !this.mainAlert.content
        },
    },
    watch: {
        mainAlert: {
            deep: true,
            handler() {
                if (this.mainAlert.content) {
                    this.content = this.mainAlert.content
                } else {
                    setTimeout(() => {
                        this.content = null
                    }, 700)
                }
            },
        },
    },
})
</script>

<style scoped>
/** @format */

#soft-alert .alert {
    font-size: 0.8rem;
    font-weight: bold;
    color: rgb(0, 89, 255);
    padding: 0.4rem;
    height: 2rem;
    position: fixed;
    top: 4rem;
    z-index: 10;
    opacity: 0.7;
    animation: hide 200ms reverse;
}

.fade {
    opacity: 0 !important;
    animation: hide 700ms;
}

@keyframes hide {
    0% {
        opacity: 0.7;
    }
    100% {
        opacity: 0;
    }
}
</style>