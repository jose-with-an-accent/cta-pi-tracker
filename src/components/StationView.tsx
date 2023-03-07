import { useParams } from "react-router"
import Timetable from "./Timetable";

type stationType = {
    num: number
}

export default function StationView() {
    const {mapid} = useParams();

    console.log(mapid);

    return(
        <div>
            <Timetable favorites={mapid} />
        </div>
    )
}