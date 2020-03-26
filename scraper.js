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
        const $ = cheerio.load(data);

        const title = $('.title_wrapper h1').first().contents().filter(function() {
            return this.type === 'text';
        }).text().trim();
        const rating = $('.subtext').contents().filter(function(){ 
            return this.nodeType == 3; 
          }).text().trim().split(',')[0].trim()
        
        const timing = $('time').contents().filter(function(){
            return this.nodeType == 3;
        }).text().trim().split(' ')[0] + ' ' + $('time').contents().filter(function(){
            return this.nodeType == 3;
        }).text().trim().split(' ')[1];
        

        const generes1 = $('.subtext').text().trim().split('|')[2].trim().split(',');
        

        const generes = generes1.map((el) => {
            return el.trim();
        })

        const imdbRating = $('span[itemprop="ratingValue"]').text();
        const poster = $('.poster a img').attr('src');
        const summary = $('.summary_text').text().trim();
        
        var directors1;
        if($('.credit_summary_item').eq(0).text()){
            directors1 = $('.credit_summary_item').eq(0).text().trim().split(/\n/)[1].split(',');    
        }else{
            directors1 = [];
        }
        

        const directors = directors1.map((el) => {
            return el.trim();
        })


        var writers1;
        if($('.credit_summary_item').eq(1).text()){
            writers1 = $('.credit_summary_item').eq(1).text().trim().split(/\n/)[1].split(',')
        }
        else{
            writers1 = [];
        }

        const writers = writers1.map((el) => {
            return el.trim().split('|')[0];
        })

        return {
            title,
            rating,
            timing: timing.trim(),
            generes,
            imdbRating,
            poster,
            summary,
            directors,
            writers
        }
    })
}


module.exports = {
    search,
    getMovie
};