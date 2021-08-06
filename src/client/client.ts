//import { io } from "socket.io-client";

class Client {
    //private url = 'http://127.0.0.1:3000';
    //private socket = io(this.url);
    //private socket2: SocketIOClient.Socket
    //private socket: socketIO.Socket

    constructor() {
        this.socket = io();
        this.socket.on("message", function (message: any) {
            console.log(message)
            document.body.innerHTML = message
        })
    }
}

const client = new Client();
