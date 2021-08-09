import express from "express"
import path from "path"
import http from "http"
import socketIO from "socket.io"

const port: number = 3000

class App {
    private server: http.Server
    private port: number
    private io: socketIO.Server

    constructor(port: number) {
        this.port = port

        const app = express()
        app.use(express.static(path.join(__dirname, '../client')))
        app.use('/jquery', express.static(path.join(__dirname, '../../node_modules/jquery/dist')))
        app.use('/bootstrap', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist')))

        this.server = new http.Server(app)
        this.io = new socketIO.Server(this.server)

        this.io.on('connect', (socket: socketIO.Socket) => {
            console.log('A user connected : ' + socket.id)
            let screenName: string = "unknowUser"

            socket.emit("screenName", screenName)
            

            socket.on('disconnect', function () {
                console.log('A user disconnected : ' + socket.id)
            })

            socket.on('chatMessage', function (chatMessage: ChatMessage) {
                socket.broadcast.emit('chatMessage', chatMessage)
            })

        })
    }

    public Start() {
        this.server.listen(this.port)
        console.log( `Server listening on port ${this.port}.` )
    }
}

new App(port).Start()