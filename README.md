## IMDb Scraper

Web Scraper to extract meta-data from [IMDB](https://www.imdb.com/) official WebSite 

## EndPoints

* /search/movie-name
	* Specify movie-name after search parameter
	* Will List meta data of that movie including:
		* Title
		* IMDBid
		* Image

	* ![](https://yatharth1706.github.io/assets/imdbScraper1.PNG "IMDB Web Scraper Search EndPoint")

* /movie/IMDBid
	* Get IMDBid from previous endpoint
	* It will list all meta data of movie including:
		* title
		* rating
		* timing
		* generes
		* poster
		* directors
		* storyline etc.

	* ![](https://yatharth1706.github.io/assets/imdbScraper2.PNG "IMDB Web Scraper Movie EndPoint")


### Remaining Tasks to do

* [x] Scrape all meta data from IMDb websites like (Name of movie, Casts, Release Date etc.)
* [x] Add exception handling
* [x] Get Cast information and year of movie
* [x] Create seperate end points in nodejs express app for scraper 
* [ ] Add Caching 