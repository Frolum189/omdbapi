export async function randommovie(id) {
    const result = await fetch(`https://www.omdbapi.com/?apikey=966e364e&i=${encodeURIComponent(id)}`);
    return await result.json();
}

async function isPosterLoadable(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

export async function fetchrandommovies() {
    function generateRandomId() {
        const randomNum = Math.floor(Math.random() * 10000000);
        return `tt${String(randomNum).padStart(7, '0')}`;
    }
    let movies = [];
    for (let i = 0; i < 5; i++) {
        let movie;
        do {
            let randomId = generateRandomId();
            movie = await randommovie(randomId);
        } while (movie.Error || movie.Response !== "True" || !movie.Poster || movie.Poster === "N/A" || movie.Title.toLowerCase().includes("episode") || !(await isPosterLoadable(movie.Poster)));

        movies.push(movie);
    }
    movies.sort((a, b) => a.Title.localeCompare(b.Title));
    console.log(movies)
    return movies;
}

