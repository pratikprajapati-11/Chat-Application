import { Server } from "socket.io";
import http from "http";
import express from 'express';

const BASE_URL = "http://localhost:5001";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    }
})

//why mapping is created 
// in this how mapping is  works ???

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    console.log("socket", socket);

    const userId = socket.handshake.query.userId;

    if (userId) userSocketMap[userId] = socket.id;

    console.log('userSocketMap', userSocketMap);

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export { io, app, server }
