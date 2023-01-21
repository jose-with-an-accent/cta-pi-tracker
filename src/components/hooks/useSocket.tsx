export default function useSocket(): WebSocket {
    const socket = new WebSocket('ws://localhost:8765')

    socket.onopen = (e => 
        {
            console.log("Socket opened!")
            socket.send(JSON.stringify({action: "PING"}))
    });
    socket.onmessage = (e => {
        console.log("new message" + e.data);
    });
    socket.onclose = () => console.log("closing socket!");

    return socket;
}