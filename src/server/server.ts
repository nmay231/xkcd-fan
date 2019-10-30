/** @format */

import path from 'path'
import express from 'express'
import fetch from 'isomorphic-fetch'

let app = express()

// My super elaborate backend at work...
app.get('/api/comic/:comicId', async (req, res) => {
    try {
        let comic = await fetch(`https://xkcd.com/${req.params.comicId}/info.0.json`).then((raw) =>
            raw.json(),
        )
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
