import asyncio
import websockets
import json
import whisper
import pyaudio

routes_to_watch = {

}
user_settings = {
    "name": ""
}

model = whisper.load_model("tiny")
p = pyaudio.PyAudio() 

async def echo(websocket):
    async for message in websocket:
        print(message)
        item = json.loads(message)
        action = item["action"]

        print(item["action"])
        match action:
            case "MICROPHONE_REQUESTED":
                start_listening()
                pass
            case "MICROPHONE_STOP_REQUESTED":
                await websocket.send(stop_listening())
                pass
            case "PING":
                await websocket.send("PONG")
            case "REFRESH_REQUESTED":
                await websocket.send(refresh_data())
                pass
            case "SETTINGS_UPDATE_REQUESTED":
                pass
            case _: 
                print("No action matched pattern")


        
        await websocket.send(message)

async def main():
    async with websockets.serve(echo, "localhost", 8765):
        await asyncio.Future()  # run forever
async def start_listening():
    stream = p.open(format=pyaudio.paInt16, channels=1, rate=44100, input=True, frames_per_buffer=1024)
    data = stream.read(1024)

    stream.stop_stream()
    stream.close()
    p.terminate()

    result = model.transcribe(data)
    print(result)
    return "uwu"
async def stop_listening():
    pass
async def refresh_data():
    pass
async def update_app_settings():
    pass
asyncio.run(main())