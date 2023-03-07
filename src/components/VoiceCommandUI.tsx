import { useEffect, useState } from "react";
import useSocket from "./hooks/useSocket";
import SpeakIndicator from "./SpeakIndicator";
import { redirect, useNavigate } from "react-router";

type VoiceCommandProps = {
    sendJsonMessage: Function,
    lastMessage: MessageEvent,
    setDestination: Function
}

export default function VoiceCommandUI({ lastMessage, sendJsonMessage, setDestination }: VoiceCommandProps) {
    const [error, setError] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        sendJsonMessage({ "action": "MICROPHONE_REQUESTED" })
    }, [])

    useEffect(() => {
        if (lastMessage !== null) {
            if (lastMessage.error !== null) {
                setError(lastMessage.error);
                return;
            }

        }
    }, [lastMessage]
    )
    // if (lastMessage.data.error !== null && lastMessage.data.error !== undefined) console.log(lastMessage.data.error);
    // if (lastMessage.data.error !== undefined) setError(lastMessage.data.error);



    return (
        <>
            <SpeakIndicator />
            <h1>Speak now.</h1>
            {/* <span>{lastMessage.data !== null && JSON.stringify(lastMessage.data)}</span> */}
            {/* {error !== undefined && <span>There was an error: {error}</span>} */}
            <p>Examples:</p>
            <ul>
                <li>Show me trains at the Fullerton station.</li>
            </ul>
        </>
    )
}