import {fetchMoviesByYear} from "../services/By Year.js";

export function homePage(app) {
    app.innerHTML = `
        <h2 style="text-align: left; margin: 20px">New Movies</h2>
        <div id="newmovies"></div>      
    `;


    function displayRandomMovies(movies) {
        newmoviesDiv.innerHTML = '';
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('mini-movie-card');
            movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}" />
            <h4>${movie.Title} (${movie.Year})</h4>
        `;
            newmoviesDiv.appendChild(movieCard);
        });
    }
    const newmoviesDiv = document.getElementById('newmovies');
    newmoviesDiv.innerHTML = '<h3>Loading...</h3>';

    (async () => {
        const movies = await fetchMoviesByYear(2025);
        displayRandomMovies(movies);
    })();}