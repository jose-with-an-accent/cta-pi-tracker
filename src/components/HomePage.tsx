import Timetable from "./Timetable";
import { TimetableRowProps } from "./TimetableRow";
const nextRoutes: TimetableRowProps[] = [
    {routeType: 'bus', routeName: "X9", mins: 42, heading: undefined, listing_type: 'live'},
    {routeType: 'train', routeName: "Blue Line", heading: "Forest Park", mins: 11, listing_type: 'scheduled'}
]
export default function HomePage() {
    return(<div id="container">
        <h1>Hello Jose.</h1>
        <Timetable nextRoutes={nextRoutes} />
    </div>)
}