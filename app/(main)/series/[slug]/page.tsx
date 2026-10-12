import { SeriesType } from "@/app/types/type"

const SeriesPage = async ({ searchParams }: { searchParams: Promise<{ id?: string }> }) => {

    const { id } = await searchParams

    let series: SeriesType | null = null

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
                }
            }
        )

        series = await response.json()

    } catch (error) {
        console.log(error)
    }

    if (!series) {
        return <p>Series not found</p>
    }

    return (
        <div className="details-container">
            <img
                className="details-image"
                src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                alt={series.name}
            />

            <div className="details-content">
                <h1 className="details-title">{series.name}</h1>

                <p className="details-overview">{series.overview}</p>

                <p className="details-info">Release date: {series.first_air_date}</p>

                <p className="details-info">Vote popularity score: {series.vote_average}</p>

            </div>
        </div>
    )
}

export default SeriesPage