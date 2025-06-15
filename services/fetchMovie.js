export async function fetchMovie(title) {
    const result = await fetch(`https://www.omdbapi.com/?apikey=966e364e&t=${encodeURIComponent(title)}`);
    return await result.json();
}