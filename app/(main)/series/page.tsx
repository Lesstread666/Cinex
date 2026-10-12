import Series from "@/app/components/Series"

const SeriesPage = async () => {

    let series = []

    try {
        const response = await fetch(
            "https://api.themoviedb.org/3/discover/tv?",
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
                }
            }
        )
        const data = await response.json()

        series = data.results

    } catch (error) {
        console.log(error)
    }

    return (
        <>
            <h1 className="header-title text-center pt-6">Series Page</h1>
            <Series series={series} />
        </>

    )
}

export default SeriesPage