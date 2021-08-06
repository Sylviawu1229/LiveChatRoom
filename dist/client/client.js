"use strict";
//import { io } from "socket.io-client";
class Client {
    //private url = 'http://127.0.0.1:3000';
    //private socket = io(this.url);
    //private socket2: SocketIOClient.Socket
    //private socket: socketIO.Socket
    constructor() {
        this.socket = io();
        // clean page
        this.socket.on("connect", function () {
            console.log("connect")
            document.body.innerHTML = ""
        })

        this.socket.on("disconnect", function (message) {
            console.log("disconnect " + message)
            document.body.innerHTML += "Disconnected from Server : " + message + "<br/>"
            //location.reload();
        })

        this.socket.on("message", function (message) {
            console.log(message);
            document.body.innerHTML += message + "<br/>"
        });

    }
}
const client = new Client();
