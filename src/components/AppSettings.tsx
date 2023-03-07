import { E } from "@tauri-apps/api/path-e12e0e34";
import { useState } from "react"
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function AppSettingsView({sendJsonMessage}) {
    const [station, setStation] = useState('');
    const [name, setName] = useState('')
    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(station)
        sendJsonMessage({
            action: "UPDATE_PREFERENCES",
            name: name,
            mapid: station
        })

    }
    function manuallyStartMicrophone() {
        sendJsonMessage(
            {
                action: "NAVIGATE_TO_SPEAK"
            }
        )
    }

    return(
        <div>
            <h1>App Settings</h1>
            <ul></ul>
            <button onClick={manuallyStartMicrophone}>Manually start microphone</button>
            <p>Select default stop (enter as a mapid, view at <a href="https://www.transitchicago.com/developers/ttdocs/">the CTA website</a>):</p>
            <form onSubmit={onSubmit} method="GET" action="">
            <input onChange={(e) => setStation(e.target.value)} type="number" />
            <input type="submit" value="submit"></input>
            <input name="darkMode" type="checkbox"/>
            <label htmlFor="darkMode">Dark Mode</label>
            <input name="userName" type="text" onChange={(e) => setName(e.target.value)} />
            <label htmlFor="userName">Select your name</label>

            </form>
        </div>
    )
}