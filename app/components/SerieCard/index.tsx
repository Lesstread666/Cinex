import { SeriesType } from "@/app/types/type"
import Link from "next/link"

const SeriesCard = ({ series }: { series: SeriesType }) => {

    const slug = series.name.toLowerCase().replaceAll(" ", "-")

    return (
        <Link href={`/series/${slug}?id=${series.id}`} >
            <div >
                <img

                    src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                    alt={series.name}
                />

                <div >
                    <h2 >
                        {series.name}
                    </h2>

                    <p>
                        Vote popularity score: {series.vote_average}
                    </p>
                    <p >
                        Release date: {series.first_air_date}
                    </p>
                </div>
            </div>
        </Link>

    )
}

export default SeriesCard