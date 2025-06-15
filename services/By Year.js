export async function fetchMoviesByYear(year) {
    let result = await fetch(`https://www.omdbapi.com/?apikey=966e364e&s=movie&y=${encodeURIComponent(year)}`);
    const data = await result.json();

    if (data.Response === 'False') {
        return [];
    }

    const movies = data.Search;
    const fiveMovies = [];
    while (fiveMovies.length < 5 && movies.length) {
        const index = Math.floor(Math.random() * movies.length);
        const movie = movies.splice(index, 1)[0];

        if (movie?.Title && movie?.Poster && movie.Poster !== "N/A") {
            fiveMovies.push(movie);
        }
    }
    return fiveMovies;
}