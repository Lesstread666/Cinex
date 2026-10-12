import { MovieType } from "@/app/types/type"
import Link from "next/link"

const MovieCard = ({ movie }: { movie: MovieType }) => {

    const slug = movie.title.toLowerCase().replaceAll(" ", "-")

    return (
        <Link href={`/movies/${slug}?id=${movie.id}`} >
            <div className="media-card">

                <img
                    className="media-card-image"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />

                <div className="media-card-content">
                    <h2 className="media-card-title">
                        {movie.title}
                    </h2>

                    <p className="media-card-info">
                        Vote popularity score: {movie.vote_average}
                    </p>

                    <p className="media-card-info">
                        Release date: {movie.release_date}
                    </p>
                    
                </div>

            </div>
        </Link>

    )
}

export default MovieCard