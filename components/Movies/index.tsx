import { MovieType } from "@/app/types/type";
import MovieCard from "../MovieCard";

const Movies = ({ movies }: { movies: MovieType[] }) => {
    return (
        <div className="media-container">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                />
            ))}
        </div>
    )
}

export default Movies