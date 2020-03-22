const fetch = require('node-fetch');
const cheerio = require('cheerio');

const searchurl = 'https://www.imdb.com/find?s=tt&ref_=fn_al_tt_mr&q='
// make a request
const movieurl = 'https://www.imdb.com/title/'


function search(movie) {
    return fetch(`${searchurl}${movie}`).then( (response) => {
        return response.text();
    }).then((response) => {
        // now we will load whole response in the cheerio to extract only required details
    
        const $ = cheerio.load(response);
    
        const movies = [];
    
        $('.findResult').each( (index, element) => {
            const $el = $(element);
            const $image = $el.find('td a img');
            const $title = $el.find('td.result_text a');
            const id = $title.attr('href').match(/title\/(.*)\//)[1];

            const movie = {
                image : $image.attr('src'),
                title : $title.text(),
                imdb: id
            }
    
            movies.push(movie);
        })
    
        return movies;
    })
}

function getMovie(imdbId){
    return fetch(`${movieurl}${imdbId}`).then( (response) => {
        return response.text();
    }).then( (data) => {
        console.log(data);
        return data;
    })
}


module.exports = {
    search,
    getMovie
};