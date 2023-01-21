import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import ServiceNotDetected from "./components/ServiceNotDetected";
import BottomNavigation from "./components/BottomNavigation";
import HomePage from "./components/HomePage";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <>
        {/* <ServiceNotDetected /> */}
        <HomePage />
        <BottomNavigation />
    </>
  );
}

export default App;
