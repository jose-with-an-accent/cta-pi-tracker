import SpeakIndicator from "./SpeakIndicator";

export default function VoiceCommandUI() {
    return(
        <>
        <SpeakIndicator />
        <h1>Speak now.</h1>
        <p>Examples:</p>
        <ul>
            <li>Show me trains in the Blue Line.</li>
            <li>Show me the next trains for the Orange Line.</li>
        </ul>
        </>
    )
}