import express from "express";
import {Server} from "socket.io";
import __dirname from "./utils.js";

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{console.log(`Listening on PORT ${PORT}`)});
const io = new Server(server);

app.use(express.static(__dirname+"/public"))

const log = [];

io.on("connection", (socket)=>{
    console.log(`New socket #${socket.id} connected`);
    socket.emit("initial", log);
    socket.on("message", (data)=>{
        log.push(data);
        io.emit("newLog", data);
    });
});
