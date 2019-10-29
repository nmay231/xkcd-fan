<template>
    <div v-if="loaded">
        <h3 class="my-3">{{comic.title}}</h3>
        <comic-image :backgroundUrl="comic.img" :hover="comic.alt" />
    </div>
    <div v-else>loading...</div>
</template>

<script>
/** @format */

import ComicImage from '../components/ComicImage'

export default {
    name: 'SingleComicPageComponent',
    props: {
        comicId: String,
    },
    data: () => ({
        loaded: true,
        comic: {
            month: '1',
            num: 688,
            link: '',
            year: '2010',
            news: '',
            safe_title: 'Self-Description',
            transcript:
                '[[There is a pie chart, mostly white with a black slice. The white is labeled "Fraction of this image which is white." The black is labeled "Fraction of this image which is black."]]\n\n[[There is a bar graph labeled "Amount of black ink by panel." Bar 1 is medium height, Bar 2 higher, Bar 3 lowest.]]\n\n[[There is a scatterplot labeled "Location of black ink in this image." It is the positive quarter of a coordinate grid with the zeroes marked. The graph is, of course, the whole comic scaled to fit the axes, including a smaller version of itself in the last panel, etc.]]\n\n{{Title text: The contents of any one panel are dependent on the contents of every panel including itself. The graph of panel dependencies is complete and bidirectional, and each node has a loop. The mouseover text has two hundred and forty-two characters.}}',
            alt:
                'The contents of any one panel are dependent on the contents of every panel including itself. The graph of panel dependencies is complete and bidirectional, and each node has a loop. The mouseover text has two hundred and forty-two characters.',
            img: 'https://imgs.xkcd.com/comics/self_description.png',
            title: 'Self-Description',
            day: '13',
        },
    }),
    created: function() {
        // this.LoadComic()
        console.log(this.comic.alt)
    },
    methods: {
        LoadComic: async function() {
            let raw = await fetch(`https://xkcd.com/${this.comicId}/info.0.json`, {
                dataType: 'json',
            })
            this.comic = await raw.json()
            this.loaded = true
        },
    },
    components: {
        'comic-image': ComicImage,
    },
}
</script>

<style>
/** @format */
</style>