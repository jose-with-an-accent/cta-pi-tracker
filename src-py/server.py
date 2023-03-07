from pvrecorder import PvRecorder
import asyncio
import websockets
import json
import pvrhino
import csv
d = {}
home_location = 41220
user_name = "Jose"
with open('stops.csv', mode='r') as f:
    data = csv.reader(f)
    d = {rows[3]: rows[5] for rows in data}

CLIENTS=set()

devices = PvRecorder.get_audio_devices()
print(devices)
rhino = pvrhino.create(
    access_key='thuR68yJAqz8beFLtVRkBy1SnvXwznt5tHCP0kwKdUMBM2AUMgib4A==',
    context_path='rp_MAC.rhn'
)

recorder = PvRecorder(device_index=-1, frame_length=512)

async def broadcast(message):
    for websocket in CLIENTS.copy():
        try:
            await websocket.send(message)
        except websockets.ConnectionClosed:
            pass
        
async def echo(websocket):
    global home_location
    global user_name
    CLIENTS.add(websocket)
    async for message in websocket:
        item = json.loads(message)
        action = item["action"]
        if (action == "NAVIGATE_TO_HOMEPAGE"):
            print("Broadcasting message...")
            await broadcast(json.dumps({"action": "NAVIGATE_TO_HOMEPAGE"}))
        elif(action == "NAVIGATE_TO_SPEAK"):
            print("Broadcasting message...")
            await broadcast(json.dumps({"action": "NAVIGATE_TO_SPEAK"}))
        if (action == "GET_PREFERENCES"):
            await broadcast(json.dumps({"action": "GET_PREFERENCES", "mapid": home_location, "user_name": user_name}))
        elif (action == "UPDATE_PREFERENCES"):
            mapid = item["mapid"]
            user_name = item["user_name"]
            home_location = int(mapid)
            await websocket.send(json.dumps({"result": "OK"}))
        elif (action == "PING"):
            await websocket.send({"action": "PONG"})
        elif "MICROPHONE_REQUESTED":
            m = await start_listening(websocket)
            # await websocket.send(json.dumps({"action": "FIND_STOP", "mapid": 40440}))

            try:
                station = d[m]
                await websocket.send(json.dumps({"action": "FIND_STOP", "mapid": station}))
            except KeyError:
                await websocket.send(json.dumps({"error": "Could not get the stop"}))


async def main():
    async with websockets.serve(echo, "localhost", 8765):
        await asyncio.Future()  # run forever


async def start_listening(websocket):
    try:
        recorder.start()

        print(rhino.context_info)

        print(recorder.selected_device)

        while True:
            pcm = recorder.read()
            is_finalized = rhino.process(pcm)
            if is_finalized:
                inference = rhino.get_inference()
                if inference.is_understood:
                    print('{')
                    print("  intent : '%s'" % inference.intent)
                    recorder.stop()
                    return inference.slots.get("train")

                else:
                    recorder.stop()
                    await websocket.send(json.dumps({"error": "didn't understand the command"}))
    except:
        await websocket.send(json.dumps({"error": "could not initialize recording"}))
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

