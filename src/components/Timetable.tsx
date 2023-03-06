import { useEffect, useState } from "react";
import TimetableRow, { TimetableRowProps } from "./TimetableRow";
interface TimetableProps {
    favorites: number
}

export default function Timetable(): JSX.Element {
    const [trains, setTrains] = useState([])
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

        res.ctatt.eta.map(item => {
            const remaining = Math.round((new Date(item.arrT).getTime() - new Date().getTime()) / (1000 * 60));
            item.mins = remaining;
            console.log(item.mins);
        })
        setTrains(res.ctatt.eta);

        
    }
    const favorites = [
        40440
    ]
    useEffect(() => {
        getTimes(favorites[0])
        setInterval(() => getTimes(40440), 60000);
    }, [])

    return (
        <>
            <h3>Timetable</h3>
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