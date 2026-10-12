import { TrendType } from "@/app/types/type"
import TrendCard from "../TrendCard"

const Trends = ({ trend }: { trend: TrendType[] }) => {
    return (
        <div className="media-container" >
            {trend.map((trend) => (
                <TrendCard
                    key={trend.id}
                    trend={trend}
                />
            ))}
        </div>
    )
}

export default Trends