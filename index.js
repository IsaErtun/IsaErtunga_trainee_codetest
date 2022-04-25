const moviesJson = require('./movies.json');

class MovieAPI {
    constructor(movies) {
        // Insert id and rating into movies
        this.movies = this.prepareMovieData(movies);
    }

    // Returns all movies
    fetchAllMovies(){
        return this.movies;
    }

    // Returns all movies from a certain genre
    getMoviesFromGenre(movieGenre) {
        return this.movies.filter((movie) => movie.genre.toLowerCase() === movieGenre.toLowerCase());
    }

    // Removes movie with provided id if exists
    // Returns true if successful, false otherwise
    removeMovieById(id) {
        // Find movie index
        let movieIndex = this.movies.findIndex((movie) => movie.id === id);

        // If movie at index doesn't exist return false, else remove from index
        if (movieIndex === -1) {
            return false;
        } else {
            this.movies.splice(movieIndex, 1).length;
            return true;
        }
    }

    // Returns movie with provided id if exits. Returns undefined otherwise
    getMovieFromId(id) {
        return this.movies.find((movie) => movie.id === id);
    }

    // Returns movies where thumb and subtitles are filtered out
    getFilteredMovies() {
        // Need to copy array, in order to not change the original one.
        const moviesCopy = this.deepCopyArray(this.movies);

        // return new array with deleted fields
        return moviesCopy.map((movie) => {
            delete movie.thumb;
            delete movie.subtitle;
            return movie;
        });
    }

    // Sorts movies based on name alphabetically
    sortMoviesByName() {
        // Need to copy array, in order to not change the original one.
        const moviesCopy = this.deepCopyArray(this.movies);

        return moviesCopy.sort((movieA, movieB) => {
            return movieA.title.localeCompare(movieB.title);
        });
    }

    // Returns 2 best and worst movies
    getBestAndWorst() {
        let bestAndWorst = [];

        // Sort by rating.
        let sortedMovies = this.sortByRating(false);
        let movieAmount = sortedMovies.length;

        bestAndWorst.push(sortedMovies[0]);
        bestAndWorst.push(sortedMovies[1]);
        bestAndWorst.push(sortedMovies[movieAmount - 1]);
        bestAndWorst.push(sortedMovies[movieAmount - 2]);

        return bestAndWorst;
    }

    // Print top [movieAmount] movies based on rating.
    printTopMovies(movieAmount) {
        let sortedMovies = this.sortByRating(false);
        for (let i = 0; i < movieAmount; i++) {
            console.log(sortedMovies[i]);
        }
    }

    // Sorts by rating, used for getting best and worst movies. Separated in case of other use.
    // Multiplies by negative for changing order (ascending or descending)
    sortByRating(isAscending) {
        // Need to copy array, in order to not change the original one.
        let moviesCopy = this.deepCopyArray(this.movies);
        let order = (isAscending === true) ? -1 : 1;

        return moviesCopy.sort((movieA, movieB) => {
            if (movieA.rating > movieB.rating) {
                return -1 * order;
            } else if(movieA.rating < movieB.rating) {
                return 1 * order;
            } else {
                return 0;
            }
        });
    }

    addMovie(newMovieData) {
        // Should generate a new unique id in real case scenario.
        let id = this.movies.length;
        let rating = this.generateRandom(1, 5);

        // Add new fields
        newMovieData.id = id;
        newMovieData.rating = rating;

        return this.movies.push(newMovieData);
    }

    // Changes title of movie with provided id.
    // returns movie if found, false otherwise
    changeMovieTitle(id, newTitle) {
        for (const movie of this.movies) {
            if (movie.id === id) {
                movie.title = newTitle;
                return movie;
            }
        }
        return false;
    }

    // Generates a number between two bounds.
    generateRandom(lowerBound, upperBound) {
        return Math.floor(Math.random() * upperBound) + lowerBound;
    }

    // Deep copies array, instead of just referencing
    deepCopyArray(arrayToCopy) {
        return JSON.parse(JSON.stringify(arrayToCopy));
    }

    // Inserts id and rating into movies
    prepareMovieData(movies) {
        // used for setting unique id's, should however use a better way to do this
        let id = 0;

        // Insert id and rating
        movies.forEach((movie) => {
            movie['id'] = id;
            movie['rating'] = this.generateRandom(1, 5);
            id++;
        });
        return movies;
    }
}

const API = new MovieAPI(moviesJson);
// const allMovies = API.fetchAllMovies();

/* -----------TESTS------------- */

// 2. Get romance movies
// const romanceMovies = API.getMoviesFromGenre('romance');
// console.log(romanceMovies);

// 3. Remove movie with id = 10
// API.removeMovieById(10);
// console.log(API.movies);

// 4. Get filtered movies
// const filteredMovies = API.getFilteredMovies();
// console.log(filteredMovies);

// 5. Sort by title name
// const moviesSorted = API.sortMoviesByName();
// console.log(moviesSorted);

// 6. Get 2 best and worst
// const bestAndWorst = API.getBestAndWorst();
// console.log(bestAndWorst)

// 7. Print top 3 best movies.
// Would optimally utilize that the dataset was sorted in the previous test and not sort again.
//API.printTopMovies(3);

// 8. Print sorted movies from ascending order
// isAscending == true
// console.log(API.sortByRating(true));

// 9. Add movie with data
/*
var newMovieData = {
    description: "Nöjesbranschen håller på att förvandlas för gott. Tv-stjärnan Rick Dalton och hans stuntman Cliff Booth försöker göra comeback i ett Hollywood de inte längre känner igen.",
    sources: [],
    subtitle: 'By Isa',
    thumb: 'images/QuentinTarantino.jpg',
    title: 'Once Upon a Time in Hollywood',
    genre: 'Action',
};
API.addMovie(newMovieData);
*/

// 10. Get movie with id = 10
// const id10Movie = API.getMovieFromId(10);
// console.log(id10Movie);

// 11. Change movie title
// console.log(API.changeMovieTitle(10, 'Pulp Fiction'));
