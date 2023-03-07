import NewsView from "./NewsView";
import Timetable from "./Timetable";
import { TimetableRowProps } from "./TimetableRow";
export default function HomePage({favorites}: Array<number>) {
    return(<div id="container">
        <h1>Hello Jose.</h1>
        <NewsView />
        <Timetable favorites={favorites} />
    </div>)
}