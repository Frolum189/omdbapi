export async function findbyid(id){
    const result = await fetch(`https://www.omdbapi.com/?apikey=966e364e&i=${encodeURIComponent(id)}`);
    return await result.json();
}