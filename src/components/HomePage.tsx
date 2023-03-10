import { useEffect } from "react";
import { useNavigate } from "react-router";
import NewsView from "./NewsView";
import Timetable from "./Timetable";
import { TimetableRowProps } from "./TimetableRow";

export default function HomePage({favorites, lastJsonMessage, sendJsonMessage, name}) {
    return(<div id="container">
        <h1>Hello {name}</h1>
        <NewsView />
        <Timetable favorites={favorites} />
    </div>)
}