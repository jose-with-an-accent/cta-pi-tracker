import { useEffect, useState } from "react";
import TimetableRow, { TimetableRowProps } from "./TimetableRow";
interface TimetableProps {
    favorites: number
}
export default function Timetable({favorites}: TimetableProps): JSX.Element {
    const [trains, setTrains] = useState([])
    const [stationName, setStationName] = useState();
    const getTimes = async (mapid: number) => {
        console.log("Refreshing Map ID...");
        
        const req = await
            fetch(`https://proxy.cors.sh/https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?mapid=${mapid}&key=2ec85c0422874dbabfbe362d25b0dff5&outputType=json`, {
                headers: {
                    'x-cors-api-key': 'temp_2716953ec83cbad8eb1fb6fd0df35947'
                }
            })
        const res = await req.json();

        console.log(res.ctatt.eta);

        setStationName(res.ctatt.eta[0].staNm)
        res.ctatt.eta.map(item => {
            const remaining = Math.round((new Date(item.arrT).getTime() - new Date().getTime()) / (1000 * 60));
            item.mins = remaining;
            console.log(item.mins);
        })
        setTrains(res.ctatt.eta);

        
    }

    useEffect(() => {
        getTimes(favorites)
        setInterval(() => getTimes(favorites), 60000);
    }, [])

    return (
        <>
            <h3>Timetable for {stationName}</h3>
            <table>
                <thead>
                    <th>
                        <td>Route</td>
                        <td>Heading to</td>
                        <td>Mins</td>
                    </th>
                </thead>
                {trains.map(val => (
                    <TimetableRow routeName={val.rt} mins={val.mins} routeType="train" listing_type={val.isSch ? "scheduled" : "live"} heading={val.destNm} />
                ))}
            </table>
        </>
    )
}