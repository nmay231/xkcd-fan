<!-- @format -->

<template>
    <div id="MainPage">
        <comic-image
            backgroundUrl="https://imgs.xkcd.com/comics/earth_temperature_timeline.png"
            hover="[After setting your car on fire] Listen, your car's temperature has changed before."
        />
        <comic-image
            backgroundUrl="https://imgs.xkcd.com/comics/self_description.png"
            hover="The contents of any one panel are dependent on the contents of every panel including itself. The graph of panel dependencies is complete and bidirectional, and each node has a loop. The mouseover text has two hundred and forty-two characters."
        />
    </div>
</template>

<script>
/** @format */

// import TestButton from './components/TestComp'
import ComicImage from '@c/components/ComicImage'

export default {
    name: 'MainPageComponent',
    components: {
        // 'test-button': TestButton,
        'comic-image': ComicImage,
    },
}
</script>

<style scoped>
/** @format */
</style>
