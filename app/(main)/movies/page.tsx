import Movies from "@/components/Movies"


const MoviesPage = async () => {

    let movies = []

    try {
        const response = await fetch(
            "https://api.themoviedb.org/3/movie/popular?language=en-US",
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
                }
            }
        )
        const data = await response.json()

        movies = data.results

    } catch (error) {
        console.log(error)
    }

    return (
        <>
            <h1 className="header-title text-center pt-6">Movies Page</h1>
            <Movies movies={movies} />
        </>

    )
}

export default MoviesPage