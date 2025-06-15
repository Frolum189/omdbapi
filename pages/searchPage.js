import {debounce} from "../utils/debounce.js";
import {fetchMovie} from "../services/fetchMovie.js";
import {findbyid} from "../services/By ID.js";
import {fetchrandommovies} from "../services/random.js";
import {fetchMoviesByYear} from "../services/By Year.js";

export function searchPage(app) {
    app.innerHTML = `
        <h2>Film Search<h2>
        <input id="movieInput" title='Example: The Social Network' placeholder="Search by film name" />
        <input id="idInput" title='Example: tt1285016' placeholder="Search by IMDB ID film" />
        <input id="yearInput" title='Example: 2019' placeholder="Search by year of release" />
        <button id="fetchRandomMoviesButton">Fetch random movies</button>
        <div id="result"></div>
        <div id="randommovies"></div>
    `;

    function displayRandomMovies(movies) {
        randomMoviesDiv.innerHTML = '';
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('mini-movie-card');
            movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}" />
            <h4>${movie.Title} (${movie.Year})</h4>
        `;
            randomMoviesDiv.appendChild(movieCard);
        });
    }


    const movieInput = document.getElementById('movieInput');
    const idInput = document.getElementById("idInput")
    const result = document.getElementById('result');
    const fetchRandomMoviesButton = document.getElementById('fetchRandomMoviesButton');
    const randomMoviesDiv = document.getElementById('randommovies');
    const yearInput = document.getElementById('yearInput');



    movieInput.addEventListener('input', debounce(async(e) => {
        const title = e.target.value.trim();
        if (!title) return (result.innerHTML = '');
        const data = await fetchMovie(title);

        if (data.Response === 'False') {
            result.innerHTML = `<p>No film was found</p>`;
            return;
        }

        result.innerHTML = `
             <div class='movie-container'>
                <img src="${data.Poster}" />
                <div id = "infocard">
                    <h3>${data.Title || 'N/A'} (${data.Year || 'N/A'})</h3>
                    <p><strong>IMDB Rating:</strong> ${data.imdbRating || 'N/A'} (${data.imdbVotes || 'N/A'} votes)</p>
                    <p><strong>Genre:</strong> ${data.Genre || 'N/A'}</p>
                    <p><strong>Country:</strong> ${data.Country || 'N/A'}</p>
                    <p><strong>Release Date:</strong> ${data.Released || 'N/A'}</p>
                    <p><strong>Director: ${data.Director || 'N/A'}</strong></p>
                    <p><strong>Duration:</strong> ${data.Runtime || 'N/A'}</p>
                    <p><strong>Plot:</strong> ${data.Plot || 'N/A'}</p>
                </div>
             </div>
        `;

    }, 500));

    idInput.addEventListener('input', debounce(async(e) => {
        const id = e.target.value.trim();
        if (!id) return (result.innerHTML = '');
        const data = await findbyid(id);

        if (data.Response === 'False') {
            result.innerHTML = `<p>No film was found</p>`;
            return;
        }

        result.innerHTML = `
             <div class='movie-container'>
                <img src="${data.Poster}" />
                <div id = "infocard">
                    <h3>${data.Title || 'N/A'} (${data.Year || 'N/A'})</h3>
                    <p><strong>IMDB Rating:</strong> ${data.imdbRating || 'N/A'} (${data.imdbVotes || 'N/A'} votes)</p>
                    <p><strong>Genre:</strong> ${data.Genre || 'N/A'}</p>
                    <p><strong>Country:</strong> ${data.Country || 'N/A'}</p>
                    <p><strong>Release Date:</strong> ${data.Released || 'N/A'}</p>
                    <p><strong>Director: ${data.Director || 'N/A'}</strong></p>
                    <p><strong>Duration:</strong> ${data.Runtime || 'N/A'}</p>
                    <p><strong>Plot:</strong> ${data.Plot || 'N/A'}</p>
                </div>
             </div>
        `;

    }, 500));

    yearInput.addEventListener('input', debounce(async(e) => {
        const year = e.target.value.trim();
        if (!year) return (result.innerHTML = '');
        const data = await fetchMoviesByYear(year);


        if (data.Response === 'False') {
            result.innerHTML = `<p>No film was found</p>`;
            return;
        }

        displayRandomMovies(await fetchMoviesByYear(year))


    }, 500));

    fetchRandomMoviesButton.addEventListener('click', async () => {
        randomMoviesDiv.innerHTML = '<h3>Loading...</h3>';
        displayRandomMovies(await fetchrandommovies());


    })
}


