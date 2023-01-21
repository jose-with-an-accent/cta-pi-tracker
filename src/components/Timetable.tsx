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
                    <td>Heading to</td>
                    <td>Mins</td>
                </th>
            </thead>
            {nextRoutes.map(val => (
                <TimetableRow routeName={val.routeName} mins={val.mins} routeType={val.routeType} listing_type={val.listing_type} heading={val.heading} />
            ))}
        </table>
    )
}