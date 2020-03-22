const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://www.imdb.com/find?s=tt&ref_=fn_al_tt_mr&q='
// make a request

function search(movie) {
    return fetch(`${url}${movie}`).then( (response) => {
        return response.text();
    }).then((response) => {
        // now we will load whole response in the cheerio to extract only required details
    
        const $ = cheerio.load(response);
    
        const movies = [];
    
        $('.findResult').each( (index, element) => {
            const $el = $(element);
            const $image = $el.find('td a img');
            const $title = $el.find('td.result_text a');
    
            const movie = {
                image : $image.attr('src'),
                title : $title.text()
            }
    
            movies.push(movie);
        })
    
        return movies;
    })
}


module.exports = {
    search
};