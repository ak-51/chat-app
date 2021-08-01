import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {Server} from 'socket.io'

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()
const port = process.env.PORT

const server = app.listen(port, () => {
  console.log(`Server Running on Port ${port}`)
})

const io = new Server(server)

io.on("connection", (socket) => {

    socket.on('join_room', (data) => {
        socket.join(data)
        console.log("User joined room: " + data)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data.content)
    })

    socket.on('disconnect', () => {
        console.log("User Disconnected")
    })
})