import TimetableRow, { TimetableRowProps } from "./TimetableRow";
interface TimetableProps {
    nextRoutes: TimetableRowProps[]
}
export default function Timetable({ nextRoutes }: TimetableProps): JSX.Element {
    return (
        <table>
            <thead>
            <th>
                <td>Route</td>
                <td>Mins</td>
            </th>
            </thead>
            {nextRoutes.map(val => (
                <TimetableRow routeName={val.routeName} mins={val.mins} routeType={val.routeType} heading={val.heading}/>
            ))}
        </table>
    )
}