export interface TimetableRowProps {
    mins: number,
    heading: string | undefined
    routeName: string,
    routeType: 'bus' | 'train'
}
export default function TimetableRow({ routeType, heading, routeName, mins }: TimetableRowProps) {
    return (
        <tr>
            <td>[{routeType}] - {routeName}</td>
            {heading !== undefined && <td>{heading}</td>}
            <td>{mins}</td>
        </tr>
    )
}