const express = require('express');
const app = express();
const scraper = require('./scraper');

const port = process.env.PORT || 3000;

app.get('/', (req,res) => {
    res.json({
        message: 'Scraping is Fun!'
    })
})

// search/spiderman

app.get('/search/:movie', (req,res) => {
    scraper.search(req.params.movie).then( (movies) => {
        res.json(movies);
    })
})

app.get('/movie/:imdbId', (req,res) => {
    scraper.getMovie(req.params.imdbId).then( (movie) => {
        res.json(movie);
    })
})

app.listen(port, () => {
    console.log(`Listening on ${port}!!`)
})