import { SeriesType } from "@/app/types/type"
import SeriesCard from "../SerieCard"


const Series = ({ series }: { series: SeriesType[] }) => {
    return (
        <div className="media-container">
            {series.map((s) => (
                <SeriesCard
                    key={s.id}
                    series={s}
                />
            ))}
        </div>
    )
}

export default Series