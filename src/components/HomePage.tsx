import Timetable from "./Timetable";
import { TimetableRowProps } from "./TimetableRow";
const nextRoutes: TimetableRowProps[] = [
    {routeType: 'bus', routeName: "X9", mins: 42, heading: undefined},
    {routeType: 'train', routeName: "Blue Line", heading: "Forest Park", mins: 11}
]
export default function HomePage() {
    return(<div id="container">
        <h1>Hello Jose.</h1>
        <Timetable nextRoutes={nextRoutes} />
    </div>)
}