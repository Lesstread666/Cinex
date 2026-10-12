export type TrendType = {
    id: number,
    media_type: "movie" | "tv",
    title: string,
    name: string,
    poster_path: string,
    vote_average: number,
    overview: string,
    release_date: string,
    first_air_date: string
}

export type MovieType = {
    id: number,
    title: string,
    poster_path: string,
    vote_average: number,
    overview: string,
    release_date: string
}

export type SeriesType = {
    id: number,
    name: string,
    poster_path: string,
    vote_average: number,
    overview: string,
    first_air_date: string
}