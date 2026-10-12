import { MovieType } from "@/app/types/type"

const MoviePage = async ({ searchParams }: { searchParams: Promise<{ id?: string }> }) => {

    const { id } = await searchParams

    let movie: MovieType | null = null

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
                }
            }
        )

        movie = await response.json()

    } catch (error) {
        console.log(error)
    }

    if (!movie) {
        return <p>Movie not found</p>
    }

    return (
        <div className="details-container">

            <img
                className="details-image"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <div className="details-content">

                <h1 className="details-title">{movie.title}</h1>

                <p className="details-overview">{movie.overview}</p>

                <p className="details-info">Release date: {movie.release_date}</p>

                <p className="details-info">Vote popularity score: {movie.vote_average}</p>
            </div>

        </div>
    )
}

export default MoviePage