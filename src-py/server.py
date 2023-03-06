import asyncio
import websockets
import json
import csv

d = {}

with open('stops.csv', mode='r') as f:
    data = csv.reader(f)
    d = {rows[3]:rows[5] for rows in data}

# import whisper
# import pyaudio
# import speech_recognition as sr
import pvrhino
from pvrecorder import PvRecorder



devices = PvRecorder.get_audio_devices()
print(devices)
rhino = pvrhino.create(
   access_key='thuR68yJAqz8beFLtVRkBy1SnvXwznt5tHCP0kwKdUMBM2AUMgib4A==',
   context_path='rp_MAC.rhn'
)
recorder=PvRecorder(device_index=-1, frame_length=512)



routes_to_watch = {

}
user_settings = {
    "name": ""
}


async def echo(websocket):
    async for message in websocket:
        print(message)
        item = json.loads(message)
        action = item["action"]

        print(item["action"])
        match action:
            case "MICROPHONE_REQUESTED":
                m = start_listening()

                station = d[m]

                await websocket.send(json.dumps({"action": "FIND_STOP", "mapid": station}))
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
def start_listening():
    try:
        recorder.start()

        print(rhino.context_info)

        print("Using device: %s" % recorder.selected_device)
        print("Listening...")

        while True:
            pcm=recorder.read()
            is_finalized=rhino.process(pcm)
            if is_finalized:
                inference=rhino.get_inference()
                if inference.is_understood:
                    print('{')
                    print("  intent : '%s'" % inference.intent)
                    recorder.stop()
                    return inference.slots.get("train")

                else:
                    print("Didn't understand the command.\n")
    except:
        print("uwu")
    # stream = p.open(format=pyaudio.paInt16, channels=1, rate=44100, input=True, frames_per_buffer=1024)
    # data = stream.read(1024)

    # stream.stop_stream()
    # stream.close()
    # p.terminate()

    # print(result)
    return "uwu"
async def stop_listening():
    pass
async def refresh_data():
    pass
async def update_app_settings():
    pass
asyncio.run(main())
