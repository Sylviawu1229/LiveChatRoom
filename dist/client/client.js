//import { io, Socket } from 'socket.io-client';
//import socketIOClient from "socket.io-client"
import { io } from 'socket.io-client';
//const socket = io('http://127.0.0.1:3000');
const socket = io();
socket.on("message", function (message) {
    console.log(message);
    document.body.innerHTML = message;
});
