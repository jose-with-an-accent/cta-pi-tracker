import SpeakIndicator from "./SpeakIndicator"

export default function ServiceNotDetected() {
    return(
        <div className="container">
            <SpeakIndicator />
        <h1>Could not detect TS.</h1>
        <h2>Check to make sure the service was launched.</h2>
        <p>TS-Frontend will continue trying to connect.</p>
        </div>
    )
}