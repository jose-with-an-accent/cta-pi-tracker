export interface TimetableRowProps {
    mins: number,
    heading: string | undefined
    routeName: TrainRoute,
    routeType: 'bus' | 'train',
    listing_type: 'scheduled' | 'live',
    isApp: boolean
}
enum TrainRoute {
    G = "Green",
    Pink = "Pink",
    Blue = "Blue",
    Org = "Orange",
    Brn = "Brown",
    P = "Purple",
    B = "Brown"
}
const TrainColors = {
    G: "#009b3a",
    Blue: "#00a1de",
    Brn: "#62361b",
    Red: "#c60c30",
    Org: "#f9461c",
    P: "#522398",
    Pink: "#e27ea6",
    Y: "#f9e300"
}
export default function TimetableRow({ routeType, routeName, heading, mins, isApp }: TimetableRowProps) {
    return (
        <tr>
            <td>
                <div style={{backgroundColor: TrainColors[routeName], width: '40px', height: '40px'}}></div>
                {routeName}</td>
            {heading !== undefined && <td>{heading}</td>}
            <td>{isApp ? <b style={{color: 'red'}}> {mins}</b> : <span>{mins}</span>}</td>
        </tr>
    )
}