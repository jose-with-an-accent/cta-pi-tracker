import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import ServiceNotDetected from "./components/ServiceNotDetected";
import BottomNavigation from "./components/BottomNavigation";
import HomePage from "./components/HomePage";
import VoiceCommandUI from "./components/VoiceCommandUI";
import useSocket from "./components/hooks/useSocket";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const favorites = useState([
    "40440"
  ])
  // const socket = useSocket()

  // useEffect(() => {
  //   socket.send("UwU")
  // }, [])

  async function getData() {
    const data = await invoke("cta_get_trains", {line: "Green Line", station: "35th/Archer"})
    console.log(data);
  }
  useEffect(() => {
    getData();
  }, [])


  return (
    <>
        {/* <ServiceNotDetected /> */}
        {/* <VoiceCommandUI /> */}
        <HomePage favorites={favorites}/>
        <BottomNavigation />
    </>
  );
}

export default App;
