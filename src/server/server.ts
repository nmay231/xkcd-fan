/** @format */

import path from 'path'
import express from 'express'
import morgan from 'morgan'
import fetch from 'isomorphic-fetch'

let app = express()

// My super elaborate backend at work...
app.use('/api', morgan('dev'))
app.get('/api/comic/:comicId?', async (req, res) => {
    const { comicId } = req.params
    if (comicId !== undefined && !parseInt(comicId)) {
        return res.status(422).send(`Invalid comicId: ${comicId}`)
    }
    try {
        const url = comicId
            ? `https://xkcd.com/${comicId}/info.0.json`
            : `https://xkcd.com/info.0.json`
        let comic = await fetch(url).then((raw) => raw.json())
        res.status(200).json(comic)
    } catch (err) {
        res.status(500).send('Failed to retrieve comic data')
    }
})

app.use('/api/*', (req, res) => res.status(404).send('Unknown endpoint'))

app.use(express.static(__dirname))
app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, 'index.html')))

const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 8090

app.listen(port, () => console.log(`Server listening on port ${port}`))
