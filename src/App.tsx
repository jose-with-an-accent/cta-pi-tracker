import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import ServiceNotDetected from "./components/ServiceNotDetected";
import BottomNavigation from "./components/BottomNavigation";
import HomePage from "./components/HomePage";
import VoiceCommandUI from "./components/VoiceCommandUI";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import StationView from "./components/StationView";
import {Route, Routes, useNavigate, useNavigation} from 'react-router'
import AppSettingsView from "./components/AppSettings";
import { BrowserRouter } from "react-router-dom";
import { Redirect } from "react-router-web";
import SocketListener from "./components/SocketListener";
function App() {
  const [g, setG] = useState(41220)
  const [name, setName] = useState("")
  const [isConnected, setIsConnected] = useState(false);
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`ws://localhost:8765`)

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  // const navigate = useNavigate();
  useEffect(() => {
    sendJsonMessage({action: "GET_PREFERENCES"})
  }, [])
  return (
    <BrowserRouter>
    <SocketListener setMapId={setG} setName={setName} sendJsonMessage={sendJsonMessage} lastJsonMessage={lastJsonMessage} readyState={readyState}/>
      <Routes>
        <Route path="/" element={<HomePage sendJsonMessage={sendJsonMessage} lastJsonMessage={lastJsonMessage} favorites={g} name={name} />}/> 
        <Route path="/settings" element={<AppSettingsView sendJsonMessage={sendJsonMessage} />} />
        <Route path="/set" element={<VoiceCommandUI sendJsonMessage={sendJsonMessage} lastMessage={lastJsonMessage} setDestination={null} />} />
        <Route path="/location/:mapid" element={<StationView />} />
      </Routes>
      </BrowserRouter>
  )
}

export default App;
