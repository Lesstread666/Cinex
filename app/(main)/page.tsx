import Trends from "../components/Trends";
import { TrendType } from "../types/type";

export default async function Home() {
  let trends = []

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US",
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
        }
      }
    )
    const data = await response.json()

    trends = data.results.filter(
      (trend: TrendType) =>
        trend.media_type === "movie" || trend.media_type === "tv"
    )
  } catch (error) {
    console.log(error)
  }

  return (
    <>
      <h1 className="header-title text-center pt-6">All Trends Page</h1>
      <Trends trend={trends} />
    </>
  );
}
