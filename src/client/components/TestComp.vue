<template>
    <b-button class="btn">testing bootstrap</b-button>
</template>

<script>
/** @format */

import Vue from 'vue'

export default Vue.extend({
    name: 'test-button',
    props: ['test', 'test2'],
    data: () => ({
        data1: 0,
    }),
})
</script>

<style scoped>
/** @format */

.btn {
    background: 'blue';
}
</style>