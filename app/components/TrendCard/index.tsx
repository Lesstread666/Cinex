import { TrendType } from "@/app/types/type"
import Link from "next/link"

const SeriesCard = ({ trend }: { trend: TrendType }) => {

    const title = trend.title || trend.name

    const slug = title.toLowerCase().replaceAll(" ", "-")

    const path = trend.media_type === "movie"
        ? `/movies/${slug}?id=${trend.id}`
        : `/series/${slug}?id=${trend.id}`

    return (
        <Link href={path}>
            <div className="media-card">

                <img
                    className="media-card-image"
                    src={`https://image.tmdb.org/t/p/w500${trend.poster_path}`}
                    alt={trend.title || trend.name}
                />

                <div className="media-card-content">
                    <h2 className="media-card-title">
                        {trend.title || trend.name}
                    </h2>

                    <p className="media-card-info">
                        Vote popularity score: {trend.vote_average}
                    </p>
                    <p className="media-card-info">
                        Release date: {trend.release_date || trend.first_air_date}
                    </p>

                    <p className="media-card-info">
                        Media: {trend.media_type.toUpperCase()}
                    </p>
                </div>
            </div>
        </Link>

    )
}

export default SeriesCard