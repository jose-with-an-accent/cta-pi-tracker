import { useEffect } from "react"
import { useNavigate } from "react-router"

type SocketListenerProps = {
    lastJsonMessage: any,
    sendJsonMessage: Function,
    readyState: any
}

export default function SocketListener({lastJsonMessage, setMapId, setName, sendJsonMessage, readyState}: SocketListenerProps) {
    const navigate = useNavigate()
    useEffect(() => {
        // sendJsonMessage({action: "GET_PREFERENCES"})
        if (readyState == 1) sendJsonMessage({"action": "PING"})
      }, [])

    useEffect(() => {
        if (lastJsonMessage !== null) {
          if (lastJsonMessage.action == "GET_PREFERENCES") {
            setMapId(lastJsonMessage.mapid)
            console.log("mapid: " + lastJsonMessage.mapid)
            setName(lastJsonMessage.user_name)
            console.log(lastJsonMessage)
          }
          if (lastJsonMessage.action == "NAVIGATE_TO_SPEAK" && window.location.hostname.includes("localhost")) navigate("/set") 
          if (lastJsonMessage.action == "NAVIGATE_TO_HOME" && window.location.hostname.includes("localhost")) navigate("/") 
          if (lastJsonMessage.action == "FIND_STOP" && window.location.hostname.includes("localhost")) {
            console.log("FIND STOP")
            navigate(`/location/${lastJsonMessage.mapid}`)
          }

        }
      }, [lastJsonMessage])
}